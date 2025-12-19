from django.urls import path
from .views import register, get_users, add_user, toggle_user_block, CustomTokenObtainPairView, stats

urlpatterns = [
    path("register/", register, name="register"),
    path("login/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("stats/", stats, name="stats"),
    path("users/", get_users, name="get_users"),
    path("users/add/", add_user, name="add_user"),
    path("users/<int:user_id>/toggle-block/", toggle_user_block, name="toggle_user_block"),
]
