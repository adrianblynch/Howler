from django.conf.urls import include, patterns, url
from django.conf.urls.i18n import i18n_patterns
from django.contrib import admin
from django.conf import settings
from django.conf.urls import patterns

admin.autodiscover()

urlpatterns = patterns('',
	url(r'^blog/', 'apps.post.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^', include('cms.urls')),
)