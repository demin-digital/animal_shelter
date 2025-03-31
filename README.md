# animal_shelter

Версия Java: 17   ?
Порт запуска: 8082


Для того, чтобы запустить проект требуется: 
1. Добавить **New configuration - Spring Boot**
2. Выбрать **Main class - AnimalShelterApplication**

ЛИБО через мавен

1. mvn spring-boot:run 

После этих 2-х простых действий, проект запустится.  
Главная страница будет доступна по ссылке: *localhost:8082*


PROD version
mvn clean package -Pproduction - обфускация

Проверка что файлы обфусцированы:
cd target
mkdir jar-test
cd jar-test
jar -xf ../animal_shelter-0.0.1-SNAPSHOT.jar
ls static/js/

Запуск JAR: java -jar target/animal_shelter-0.0.1-SNAPSHOT.jar 