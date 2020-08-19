FROM nginx:1.19.0
USER root
RUN rm -Rf /usr/share/nginx/html
ADD client/build /usr/share/nginx/client/html
RUN chmod -Rf 777 /usr/share/nginx/client/html
ADD admin/build /usr/share/nginx/admin/html
RUN chmod -Rf 777 /usr/share/nginx/admin/html
ADD parkinglot/build /usr/share/nginx/parkinglot/html
RUN chmod -Rf 777 /usr/share/nginx/parkinglot/html
ADD cert /etc/nginx/cert
COPY nginx_dev.conf /etc/nginx/nginx.conf