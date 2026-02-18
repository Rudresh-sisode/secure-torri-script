from django.shortcuts import render
from django.conf import settings

def profile_view(request):
    """Render the profile page with Vapi configuration."""
    context = {
        'vapi_assistant_id': settings.VAPI_ASSISTANT_ID,
        'vapi_api_key': settings.VAPI_API_KEY,
    }
    return render(request, 'profileapp/profile.html', context)
