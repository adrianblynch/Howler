from django.shortcuts import render, render_to_response
from django.template.response import TemplateResponse
from apps.post.models import Post
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger



def home(request):
	posts = Post.objects.all().order_by('pub_date').reverse()
	paginator = Paginator(posts, 5)
	page = request.GET.get('page')

	try:
		posts = paginator.page(page)
	except PageNotAnInteger:
		posts = paginator.page(1)
	except EmptyPage:
		posts = paginator.page(paginator.num_pages)

	return TemplateResponse(request, 'feed.html', {'posts':posts})
	#return render_to_response('feed.html', {"posts": posts})
	#return TemplateResponse(request, "feed.html", {'blogposts': Blogpost.objects.all()})

