<h1 align="center"> Oracle Next Education Challenge - Hotel </h1>


<br>

<div align="center">
 
![image](https://github.com/loolcas/OracleNE-Hotel/assets/118030896/a9a93269-24f4-4678-bc0c-3ad5e620a7a9) ![image](https://github.com/loolcas/OracleNE-Hotel/assets/118030896/c7cb5eed-0311-4acb-90c6-5186cc66039e) ![image](https://github.com/loolcas/OracleNE-Hotel/assets/118030896/47d04337-8ecc-4428-b11a-e674afa1d696) ![image](https://github.com/loolcas/OracleNE-Hotel/assets/118030896/1404e058-bdb9-4c6d-b7e3-7d4edb54d3b8) ![image](https://github.com/loolcas/OracleNE-Hotel/assets/118030896/6d56f816-2c5a-4f6f-88c6-fec21e52ff25)

</div>

<br>

### 🔐 *Requisitos:*
- Possuir o Java Development Kit 17+, caso não tenha baixe o instalador para *<a href="">Windows</a>* ou para *<a href="https://www.oracle.com/br/java/technologies/downloads/#jdk21-windows">Linux ou Mac</a>*.
- Possuir o MySQL instalado, caso não tenha baixe *<a href="https://downloads.mysql.com/archives/get/p/25/file/mysql-installer-community-8.0.32.0.msi">por aqui</a>* 
 (Pacote Developer Default).
- Possuir o Node.js instalado, caso não tenha baixe a <a href="https://nodejs.org/dist/v18.18.0/node-v18.18.0-x64.msi">*versão Windows*</a> ou a versão para <a href="https://nodejs.org/pt-br/download">*Linux ou Mac*</a>

<br>

## *Passo a passo*

### 👨‍💻 *Preparos*
- Windows + Pause/Break -> Configurações avançadas do sistema -> Variáveis de ambiente -> Path -> Editar
- Criar um novo caminho para o JDK e para o MySQL e passar os respectivos endereço dos arquivos.

<br>

### ⬇ Baixe o projeto por *<a href="https://github.com/loolcas/OracleNE-Hotel/archive/refs/tags/v1.0.0.zip"> aqui </a>*
> Extrair no Desktop / Área de Trabalho

<br>

### ⚙ Iniciando o servidor Back-End
##### Abra o Prompt de Comandos do sistema
> Pressione Windows+R, digite cmd e pressione enter
##### Digite as linhas de comandos abaixo uma por vez:
> Estou considerando username e password padrão, caso contrário basta modificar
```sql
mysql -u root -p
```
```sql
Password: root
```
> Obrigatório usar o mesmo nome para o banco de dados
```sql
create database hotel_one;
```
```sql
exit
```
```shell
cd Desktop/OracleNE-Hotel-1.0.0/Back-End/hotel
```
> Caso username e password = root execute a primeira linha de comando a seguir, do contrário execute a segunda
```java
java -jar target/hotel-0.0.1-SNAPSHOT.jar
```
```java
java -Dspring.profile.active=prod -DDATASOURCE_USERNAME='outrousername' -DDATASOURCE_PASSWORD='outrasenha' -jar target/hotel-0.0.1-SNAPSHOT.jar
```
> Após servidor iniciar minimize o CMD

<br>

### ⚙ Iniciando o servidor Front-End
##### Abra outro Prompt de Comandos
> Pressione Windows+R, digite cmd e pressione enter
##### Digite as linhas de comandos abaixo uma por vez:
```node
npm install -g http-server
```
```shell
cd Desktop/OracleNE-Hotel-1.0.0/Front-End
```
```node
http-server -p 8081
```
> Após servidor iniciar minimize o CMD

<br>

### ▶ Acessando a aplicação
##### Enquanto os dois servidores estão ligados, acesse o navegador e entre no endereço abaixo
```javascript
localhost:8081
```
##### Nomes e senhas disponíveis
```javascript
[
  {nome:"admin", senha:"admin"},
  {nome:"oracle", senha:"oracle"},
  {nome:"alura", senha:"alura"},
  {nome:"root", senha:"root"}
]
```

<div align="center">

![hotel](https://i.imgur.com/TV6x4Wv.png)
  
</div>

### Não feche o servidor pelo X
> Em cada CMD pressione Ctrl+C e digite:
```java
exit
```

<h2 align="center"><i>Em caso de dúvidas assista o processo em vídeo:</i></h2>
<div align="center">
<a href="" target="_blank"><img alt="imagem de um iframe" src="https://www.plainlight.com/images/youtube-iframe-api-player-cover.png"></a>
</div>
