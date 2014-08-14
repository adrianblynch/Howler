from django.contrib import admin
from apps.post.models import Post, LargeImage, MediumImage, SmallImage

class LargeImageInline(admin.TabularInline):
    model = LargeImage
    extra = 1

class MediumImageInline(admin.TabularInline):
    model = MediumImage
    extra = 2

class SmallImageInline(admin.TabularInline):
    model = SmallImage
    extra = 3

class PostsAdmin(admin.ModelAdmin):
	list_display = ('title',)
	ordering = ('-pub_date',)
	prepopulated_fields = {'slug': ('title',)}
	inlines = [LargeImageInline,MediumImageInline,SmallImageInline]

admin.site.register(Post, PostsAdmin)
