from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from models import SlideshowPlugin
from django.utils.translation import ugettext as _

class CMSSlideshowPlugin(CMSPluginBase):
    model = SlideshowPlugin
    name = _("Slideshow")
    render_template = "slideshow.html"

    def render(self, context, instance, placeholder):
        context.update({
            'slideshow':instance.slideshow,
            'object':instance,
            'placeholder':placeholder
        })
        return context

plugin_pool.register_plugin(CMSSlideshowPlugin)