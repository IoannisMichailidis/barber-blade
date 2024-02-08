from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

# -------------------------------------------------------------------
# Custom Pagination Classes
# -------------------------------------------------------------------
# Prevent Pagination
class NoPagination(PageNumberPagination):
    page_size = None  # Effectively disables pagination

# I use custom pagination to modify the default response and add the page, and pages into the response
class CustomPageNumberPagination(PageNumberPagination):
    def get_paginated_response(self, data):
        return Response({
            'links': {
               'next': self.get_next_link(),
               'previous': self.get_previous_link()
            },
            'count': self.page.paginator.count,
            'page': self.page.number,
            'pages': self.page.paginator.num_pages,
            'page_size': self.page_size,
            'results': data
        })