# Usar a imagem oficial do PHP com Apache
FROM php:8.2-apache

# Copiar os arquivos do projeto para o diretório raiz do Apache
COPY . /var/www/html/

# Configurar permissões para a pasta de trabalho do Apache
RUN chown -R www-data:www-data /var/www/html
RUN chmod -R 755 /var/www/html

# Expor a porta 80 para acesso HTTP
EXPOSE 80
