FROM nginx:1.18.0
USER root
RUN rm -Rf /usr/share/nginx/html
ADD build /usr/share/nginx/html
RUN chmod -Rf 777 /usr/share/nginx/html
ADD cert /etc/nginx/cert
COPY nginx.conf /etc/nginx