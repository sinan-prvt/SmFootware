import os
from django.conf import settings
from rest_framework import viewsets, filters, permissions, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.db import OperationalError, ProgrammingError, connection
from django_filters.rest_framework import DjangoFilterBackend
from .models import Category, Product, ProductImage
from .serializers import CategorySerializer, ProductListSerializer, ProductDetailSerializer, ProductImageSerializer
from .permissions import IsAdminOrReadOnly


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login(request):
    """Login endpoint for admin authentication"""
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = authenticate(username=username, password=password)
    except (OperationalError, ProgrammingError) as e:
        return Response(
            {
                'error': 'Service is not ready. Run migrations or check DB connection.',
                'details': str(e)
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    if user is None:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

    if not user.is_staff:
        return Response({'error': 'Only admin users can login'}, status=status.HTTP_401_UNAUTHORIZED)

    try:
        token, created = Token.objects.get_or_create(user=user)
    except (OperationalError, ProgrammingError) as e:
        return Response(
            {
                'error': 'Token storage is not ready.',
                'details': str(e)
            },
            status=status.HTTP_503_SERVICE_UNAVAILABLE
        )

    return Response({'token': token.key, 'user': user.username}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def health(request):
    """Deep health check for database connectivity and environment status"""
    db_status = "Unknown"
    db_error = None
    
    try:
        connection.ensure_connection()
        db_status = "Connected"
    except Exception as e:
        db_status = "Disconnected"
        db_error = str(e)
        
    return Response({
        "status": "online" if db_status == "Connected" else "degraded",
        "database": {
            "status": db_status,
            "error": db_error
        },
        "environment": {
            "has_db_url": bool(os.environ.get('DATABASE_URL') or os.environ.get('SUPABASE_URL') or os.environ.get('SUPABASE_DB_URL')),
            "debug": settings.DEBUG,
        }
    })


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.select_related('category').prefetch_related('images')
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['category']
    search_fields = ['name', 'brand_name', 'article']
    ordering_fields = ['created_at', 'name', 'price']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    @action(detail=False, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upload_image(self, request):
        product_id = request.data.get('product_id')
        image = request.FILES.get('image')
        alt_text = request.data.get('alt_text', '')
        is_primary = request.data.get('is_primary', False)

        try:
            product = Product.objects.get(id=product_id)
            product_image = ProductImage.objects.create(
                product=product,
                image=image,
                alt_text=alt_text,
                is_primary=is_primary
            )
            return Response(ProductImageSerializer(product_image).data, status=201)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=404)


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [IsAdminOrReadOnly]
