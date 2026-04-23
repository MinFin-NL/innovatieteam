FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dashboard.html /usr/share/nginx/html/index.html
COPY icons/ /usr/share/nginx/html/icons/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
