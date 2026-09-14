const mongoose = require('mongoose');
const Termino = require('./models/Termino');

// Tus datos originales del terminos.json con categorías asignadas
const terminosData = [
  {
    "id": 1,
    "concepto": "HTML",
    "definicionCorta": "Lenguaje de etiquetas para estructurar páginas web.",
    "definicionLarga": "HTML (HyperText Markup Language) es el estándar para crear documentos enlazados en la Web. Define la estructura de la página usando elementos como encabezados, párrafos, enlaces, imágenes y formularios.",
    "ejemplos": ["<h1>Título principal</h1>", "<p>Este es un párrafo de ejemplo.</p>"],
    "imagen": "img/html-icon.png",
    "categorias": ["Web", "Frontend"]
  },
  {
    "id": 2,
    "concepto": "CSS",
    "definicionCorta": "Lenguaje de estilos para diseñar páginas web.",
    "definicionLarga": "CSS (Cascading Style Sheets) controla la presentación de documentos HTML. Permite definir colores, tipografías, márgenes, layouts con Flexbox y Grid, animaciones y efectos responsivos.",
    "ejemplos": ["body { background: #fff; }", ".container { display: grid; }"],
    "imagen": "img/css-icon.png",
    "categorias": ["Web", "Frontend"]
  },
  {
    "id": 3,
    "concepto": "JavaScript",
    "definicionCorta": "Lenguaje de programación para la web.",
    "definicionLarga": "JavaScript es un lenguaje interpretado, basado en prototipos, que se ejecuta en el navegador. Permite manipular el DOM, manejar eventos, realizar peticiones AJAX y crear aplicaciones web dinámicas.",
    "ejemplos": ["console.log('Hola mundo');", "document.getElementById('id').innerText = 'Texto';"],
    "imagen": "img/js-icon.png",
    "categorias": ["Web", "Frontend", "Programación"]
  },
  {
    "id": 4,
    "concepto": "API",
    "definicionCorta": "Interfaz para comunicarse entre software.",
    "definicionLarga": "API (Application Programming Interface) es un conjunto de definiciones y protocolos que permiten que distintos componentes de software interactúen. Permiten consultas remotas, envío de datos y funciones predefinidas.",
    "ejemplos": ["fetch('https://api.example.com/data')", "POST /users HTTP/1.1"],
    "imagen": "img/api-icon.png",
    "categorias": ["Web", "Backend", "Programación"]
  },
  {
    "id": 5,
    "concepto": "DNS",
    "definicionCorta": "Sistema de nombres de dominio para traducir hostnames a IPs.",
    "definicionLarga": "DNS (Domain Name System) es un servicio que convierte nombres de dominio legibles (como ejemplo.com) en direcciones IP que usan los equipos para comunicarse en la red.",
    "ejemplos": ["dig ejemplo.com", "nslookup google.com"],
    "imagen": "img/dns-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 6,
    "concepto": "IP",
    "definicionCorta": "Dirección lógica de un dispositivo en una red.",
    "definicionLarga": "IP (Internet Protocol) es un conjunto de reglas que rigen el formato de los datagramas y su enrutamiento, asignando a cada dispositivo una dirección única en la red.",
    "ejemplos": ["192.168.0.1", "2001:0db8:85a3::8a2e:0370:7334"],
    "imagen": "img/ip-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 7,
    "concepto": "HTTP",
    "definicionCorta": "Protocolo de transferencia de hipertexto para la web.",
    "definicionLarga": "HTTP (HyperText Transfer Protocol) es el protocolo base que usa el navegador para solicitar y recibir páginas y recursos desde servidores web.",
    "ejemplos": ["GET /index.php HTTP/1.1", "POST /login HTTP/1.1"],
    "imagen": "img/http-icon.png",
    "categorias": ["Web"]
  },
  {
    "id": 8,
    "concepto": "HTTPS",
    "definicionCorta": "HTTP sobre SSL/TLS para conexiones seguras.",
    "definicionLarga": "HTTPS es la versión segura de HTTP que utiliza SSL/TLS para cifrar la comunicación entre cliente y servidor, garantizando confidencialidad e integridad de los datos.",
    "ejemplos": ["https://example.com", "curl -I https://api.service.com"],
    "imagen": "img/https-icon.png",
    "categorias": ["Web", "Seguridad"]
  },
  {
    "id": 9,
    "concepto": "REST",
    "definicionCorta": "Estilo arquitectónico de servicios web.",
    "definicionLarga": "REST (Representational State Transfer) defines un conjunto de principios para el diseño de APIs web que usan métodos HTTP estandarizados (GET, POST, PUT, DELETE) y URLs para acceder a recursos.",
    "ejemplos": ["GET /api/users", "DELETE /api/posts/123"],
    "imagen": "img/rest-icon.png",
    "categorias": ["Web", "Backend"]
  },
  {
    "id": 10,
    "concepto": "JSON",
    "definicionCorta": "Formato ligero de intercambio de datos.",
    "definicionLarga": "JSON (JavaScript Object Notation) es un formato de texto que representa estructuras de datos en pares clave–valor, ampliamente usado en APIs y configuración de aplicaciones.",
    "ejemplos": ["{\"nombre\":\"Ana\",\"edad\":30}", "[1, 2, 3, 4]"],
    "imagen": "img/json-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 11,
    "concepto": "AJAX",
    "definicionCorta": "Técnica para cargar datos asincrónicamente.",
    "definicionLarga": "AJAX (Asynchronous JavaScript and XML) permite actualizar partes de una página web sin recargarla completamente, usando peticiones HTTP en segundo plano.",
    "ejemplos": ["fetch('/data.json')", "$.ajax({ url: '/api' })"],
    "imagen": "img/ajax-icon.png",
    "categorias": ["Web", "Frontend"]
  },
  {
    "id": 12,
    "concepto": "DOM",
    "definicionCorta": "Modelo de objeto de documento HTML/XML.",
    "definicionLarga": "DOM (Document Object Model) es una representación en árbol de los elementos de un documento HTML o XML, que puede ser manipulada dinámicamente con JavaScript.",
    "ejemplos": ["document.getElementById('id')", "element.style.color = 'red'"],
    "imagen": "img/dom-icon.png",
    "categorias": ["Web", "Frontend"]
  },
  {
    "id": 13,
    "concepto": "SQL",
    "definicionCorta": "Lenguaje de consulta para bases de datos relacionales.",
    "definicionLarga": "SQL (Structured Query Language) se utiliza para gestionar y consultar datos en sistemas de bases de datos relacionales mediante sentencias como SELECT, INSERT, UPDATE y DELETE.",
    "ejemplos": ["SELECT * FROM usuarios;", "UPDATE productos SET precio=10.0 WHERE id=1;"],
    "imagen": "img/sql-icon.png",
    "categorias": ["Backend", "Programación"]
  },
  {
    "id": 14,
    "concepto": "NoSQL",
    "definicionCorta": "Bases de datos no relacionales orientadas a documentos.",
    "definicionLarga": "NoSQL engloba sistemas de almacenamiento de datos que no usan el modelo relacional tradicional, como bases de documentos, clave-valor o grafos, y que escalan fácilmente.",
    "ejemplos": ["db.collection.insert({nombre:'Luis'})", "redis.set('clave','valor')"],
    "imagen": "img/nosql-icon.png",
    "categorias": ["Backend", "Programación"]
  },
  {
    "id": 15,
    "concepto": "UX",
    "definicionCorta": "Experiencia de usuario en productos digitales.",
    "definicionLarga": "UX (User Experience) se enfoca en diseñar productos que ofrezcan experiencias significativas y relevantes a los usuarios, considerando usabilidad, accesibilidad y satisfacción.",
    "ejemplos": ["Pruebas de usabilidad", "Mapas de empatía"],
    "imagen": "img/ux-icon.png",
    "categorias": ["Frontend", "Otros"]
  },
  {
    "id": 16,
    "concepto": "UI",
    "definicionCorta": "Interfaz de usuario visual de una aplicación.",
    "definicionLarga": "UI (User Interface) engloba los elementos visuales con los que interactúa el usuario, como botones, menús y formularios, buscando claridad y coherencia gráfica.",
    "ejemplos": ["Botón primario azul", "Menú hamburguesa en móvil"],
    "imagen": "img/ui-icon.png",
    "categorias": ["Frontend", "Otros"]
  },
  {
    "id": 17,
    "concepto": "Cloud Computing",
    "definicionCorta": "Servicios de computación distribuidos en la nube.",
    "definicionLarga": "Cloud Computing ofrece recursos informáticos (servidores, almacenamiento, bases de datos) a demanda a través de Internet, permitiendo escalabilidad y pago por uso.",
    "ejemplos": ["AWS EC2", "Google Cloud Storage"],
    "imagen": "img/cloud-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 18,
    "concepto": "Server",
    "definicionCorta": "Equipo o software que provee servicios en red.",
    "definicionLarga": "Un servidor es un sistema (hardware o software) que atiende solicitudes de clientes, proporcionando recursos como páginas web, archivos o servicios de base de datos.",
    "ejemplos": ["Apache HTTP Server", "Node.js Express"],
    "imagen": "img/server-icon.png",
    "categorias": ["Backend", "Infraestructura"]
  },
  {
    "id": 19,
    "concepto": "Client",
    "definicionCorta": "Equipo o software que consume servicios.",
    "definicionLarga": "El cliente es la parte que solicita y consume servicios de un servidor, como un navegador web, una app móvil o un cliente de base de datos.",
    "ejemplos": ["Chrome, Firefox", "Postman"],
    "imagen": "img/client-icon.png",
    "categorias": ["Frontend"]
  },
  {
    "id": 20,
    "concepto": "SSL/TLS",
    "definicionCorta": "Protocolos de cifrado para comunicaciones seguras.",
    "definicionLarga": "SSL (Secure Sockets Layer) y su sucesor TLS (Transport Layer Security) proporcionan cifrado y autenticación para proteger datos transmitidos entre cliente y servidor.",
    "ejemplos": ["Certificado PEM", "HTTPS sobre TLS"],
    "imagen": "img/ssl-icon.png",
    "categorias": ["Seguridad"]
  },
  {
    "id": 21,
    "concepto": "JWT",
    "definicionCorta": "Token JSON para autenticación segura.",
    "definicionLarga": "JWT (JSON Web Token) es un estándar abierto que define un formato compacto y seguro para transmitir información como un objeto JSON entre partes, firmado y opcionalmente cifrado.",
    "ejemplos": ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", "Authorization: Bearer <token>"],
    "imagen": "img/jwt-icon.png",
    "categorias": ["Seguridad", "Backend"]
  },
  {
    "id": 22,
    "concepto": "OAuth",
    "definicionCorta": "Protocolo de autorización delegada.",
    "definicionLarga": "OAuth es un protocolo que permite a aplicaciones de terceros obtener acceso limitado a un servicio HTTP en nombre del usuario, sin exponer sus credenciales.",
    "ejemplos": ["GET /oauth/authorize", "POST /oauth/token"],
    "imagen": "img/oauth-icon.png",
    "categorias": ["Seguridad", "Backend"]
  },
  {
    "id": 23,
    "concepto": "XSS",
    "definicionCorta": "Vulnerabilidad de inyección de scripts en web.",
    "definicionLarga": "XSS (Cross‑Site Scripting) es una vulnerabilidad de seguridad web que permite a un atacante inyectar código JavaScript malicioso en páginas vistas por otros usuarios.",
    "ejemplos": ["<script>alert('XSS')</script>", "document.cookie"],
    "imagen": "img/xss-icon.png",
    "categorias": ["Seguridad", "Web"]
  },
  {
    "id": 24,
    "concepto": "CORS",
    "definicionCorta": "Política de recursos cruzados en navegadores.",
    "definicionLarga": "CORS (Cross‑Origin Resource Sharing) es un mecanismo que usa cabeceras HTTP para indicar qué orígenes externos tienen permiso para acceder a recursos de un servidor.",
    "ejemplos": ["Access-Control-Allow-Origin: *", "fetch(url, { mode: 'cors' })"],
    "imagen": "img/cors-icon.png",
    "categorias": ["Web", "Backend"]
  },
  {
    "id": 25,
    "concepto": "Agile",
    "definicionCorta": "Metodología de desarrollo incremental.",
    "definicionLarga": "Agile es un conjunto de prácticas y valores para la gestión de proyectos de software que enfatiza la entrega continua, la colaboración y la flexibilidad ante cambios.",
    "ejemplos": ["Sprints de 2 semanas", "Reuniones diarias (stand‑up)"],
    "imagen": "img/agile-icon.png",
    "categorias": ["Otros"]
  },
  {
    "id": 26,
    "concepto": "Scrum",
    "definicionCorta": "Framework Agile para equipos.",
    "definicionLarga": "Scrum es un framework Agile que estructura el desarrollo en ciclos cortos llamados Sprints, con roles definidos (Scrum Master, Product Owner, equipo), eventos y artefactos para gestionar el progreso.",
    "ejemplos": ["Sprint Planning", "Daily Scrum", "Sprint Review"],
    "imagen": "img/scrum-icon.png",
    "categorias": ["Otros"]
  },
  {
    "id": 27,
    "concepto": "Kanban",
    "definicionCorta": "Método visual de flujo de trabajo.",
    "definicionLarga": "Kanban es un método Agile que utiliza un tablero visual con tarjetas y columnas (To Do, Doing, Done) para gestionar y optimizar el flujo de trabajo en tiempo real.",
    "ejemplos": ["Tarjeta moviéndose de Backlog a In Progress", "Limitar WIP (Work In Progress)"],
    "imagen": "img/kanban-icon.png",
    "categorias": ["Otros"]
  },
  {
    "id": 28,
    "concepto": "CI/CD",
    "definicionCorta": "Integración y entrega continua.",
    "definicionLarga": "CI/CD describe prácticas de automatización donde el código se integra frecuentemente (CI) y se despliega automáticamente en entornos de prueba o producción (CD), garantizando calidad y rapidez.",
    "ejemplos": ["Jenkins Pipeline", "GitHub Actions: workflow de build y deploy"],
    "imagen": "img/cicd-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 29,
    "concepto": "Docker",
    "definicionCorta": "Contenedores ligeros para aplicaciones.",
    "definicionLarga": "Docker es una plataforma que empaqueta una aplicación y sus dependencias en contenedores estandarizados, asegurando que se ejecute de forma consistente en cualquier entorno.",
    "ejemplos": ["docker build -t mi-app .", "docker run -d -p 80:80 mi-app"],
    "imagen": "img/docker-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 30,
    "concepto": "Kubernetes",
    "definicionCorta": "Orquestador de contenedores a escala.",
    "definicionLarga": "Kubernetes es un sistema de orquestación de contenedores que automatiza despliegue, escalado y gestión de aplicaciones en contenedores en clústeres distribuidos.",
    "ejemplos": ["kubectl apply -f deployment.yaml", "kubectl get pods"],
    "imagen": "img/kubernetes-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 31,
    "concepto": "Firewall",
    "definicionCorta": "Sistema de filtrado de tráfico de red.",
    "definicionLarga": "Un firewall es un dispositivo o software que monitorea y controla el acceso de tráfico entrante y saliente según reglas de seguridad definidas, protegiendo redes y sistemas.",
    "ejemplos": ["iptables -A INPUT -p tcp --dport 22 -j ACCEPT", "Regla de bloqueo por IP"],
    "imagen": "img/firewall-icon.png",
    "categorias": ["Seguridad", "Redes"]
  },
  {
    "id": 32,
    "concepto": "VPN",
    "definicionCorta": "Red privada virtual cifrada.",
    "definicionLarga": "VPN (Virtual Private Network) crea un túnel seguro y cifrado sobre Internet entre el usuario y la red de destino, protegiendo la privacidad y permitiendo acceso remoto.",
    "ejemplos": ["OpenVPN: .ovpn config", "IPsec Site-to-Site"],
    "imagen": "img/vpn-icon.png",
    "categorias": ["Seguridad", "Redes"]
  },
  {
    "id": 33,
    "concepto": "LAN",
    "definicionCorta": "Red de área local.",
    "definicionLarga": "LAN (Local Area Network) es una red que interconecta dispositivos en un área geográfica reducida, como una oficina o edificio, permitiendo compartir recursos y datos.",
    "ejemplos": ["Ethernet 1Gbps", "SSID de red Wi‑Fi local"],
    "imagen": "img/lan-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 34,
    "concepto": "WAN",
    "definicionCorta": "Red de área amplia.",
    "definicionLarga": "WAN (Wide Area Network) conecta redes LAN en ubicaciones geográficas extendidas, usando enlaces de alta velocidad o satélite, para compartir información entre sucursales.",
    "ejemplos": ["MPLS", "VPN Site-to-Site"],
    "imagen": "img/wan-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 35,
    "concepto": "SQL Injection",
    "definicionCorta": "Ataque que inyecta código SQL malicioso.",
    "definicionLarga": "SQL Injection es una vulnerabilidad de seguridad donde un atacante inserta o manipula consultas SQL en la entrada de la aplicación, obteniendo acceso no autorizado a la base de datos.",
    "ejemplos": ["' OR '1'='1'; --", "UNION SELECT usuario, contraseña FROM usuarios"],
    "imagen": "img/sql-injection-icon.png",
    "categorias": ["Seguridad"]
  },
  {
    "id": 36,
    "concepto": "Encryption",
    "definicionCorta": "Proceso de codificar datos para protegerlos.",
    "definicionLarga": "La encriptación convierte información legible en un formato cifrado usando algoritmos y claves, de manera que solo quien tenga la clave correcta pueda descifrar y leer los datos.",
    "ejemplos": ["AES-256", "RSA 2048 bits"],
    "imagen": "img/encryption-icon.png",
    "categorias": ["Seguridad"]
  },
  {
    "id": 37,
    "concepto": "Virtualization",
    "definicionCorta": "Creación de instancias virtuales de recursos.",
    "definicionLarga": "La virtualización permite ejecutar múltiples sistemas operativos o aplicaciones aisladas en un solo hardware físico, usando hipervisores como VMware o Hyper-V.",
    "ejemplos": ["VMware Workstation", "virt-install --name vm1", "Hyper-V Manager"],
    "imagen": "img/virtualization-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 38,
    "concepto": "Microservices",
    "definicionCorta": "Arquitectura de servicios pequeños independientes.",
    "definicionLarga": "Los microservicios dividen una aplicación en servicios autónomos y desplegables por separado, facilitando escalabilidad, mantenibilidad y despliegue continuo.",
    "ejemplos": ["Servicio de usuarios + Servicio de pagos", "Comunicación vía REST o gRPC"],
    "imagen": "img/microservices-icon.png",
    "categorias": ["Backend", "Infraestructura"]
  },
  {
    "id": 39,
    "concepto": "Load Balancer",
    "definicionCorta": "Distribuye carga entre servidores.",
    "definicionLarga": "Un balanceador de carga recibe solicitudes de los clientes y las reparte entre varios servidores backend según algoritmos (round robin, least connections), mejorando rendimiento y disponibilidad.",
    "ejemplos": ["AWS ELB", "nginx upstream configuration"],
    "imagen": "img/load-balancer-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 40,
    "concepto": "API Gateway",
    "definicionCorta": "Punto único de entrada para APIs.",
    "definicionLarga": "Un API Gateway actúa como punto de entrada único para múltiples servicios backend, manejando ruteo, autenticación, throttling, caching y monitoreo de las APIs.",
    "ejemplos": ["Amazon API Gateway", "Kong configuration file"],
    "imagen": "img/api-gateway-icon.png",
    "categorias": ["Backend", "Infraestructura"]
  },
  {
    "id": 41,
    "concepto": "RESTful",
    "definicionCorta": "API que sigue principios REST.",
    "definicionLarga": "RESTful describe APIs que implementan correctamente el estilo arquitectónico REST, usando recursos identificados por URLs, métodos HTTP bien definidos y representaciones de estado transferidas entre cliente y servidor.",
    "ejemplos": ["GET /api/products", "PUT /api/users/123"],
    "imagen": "img/restful-icon.png",
    "categorias": ["Web", "Backend"]
  },
  {
    "id": 42,
    "concepto": "SOAP",
    "definicionCorta": "Protocolo de intercambio de mensajes XML.",
    "definicionLarga": "SOAP (Simple Object Access Protocol) es un protocolo de mensajería basado en XML para invocar servicios web, con encabezados que definen seguridad, transacciones y formatos de mensaje.",
    "ejemplos": ["<soap:Envelope>…</soap:Envelope>", "WSDL para describir servicios SOAP"],
    "imagen": "img/soap-icon.png",
    "categorias": ["Web", "Backend"]
  },
  {
    "id": 43,
    "concepto": "GraphQL",
    "definicionCorta": "Lenguaje de consulta para APIs.",
    "definicionLarga": "GraphQL es un lenguaje de consulta desarrollado por Facebook que permite a los clientes especificar exactamente qué datos necesitan, reduciendo la sobrecarga en comparación con las llamadas REST tradicionales.",
    "ejemplos": ["query { user(id:1) { name email } }", "mutation { addPost(title:\"x\") { id } }"],
    "imagen": "img/graphql-icon.png",
    "categorias": ["Web", "Backend"]
  },
  {
    "id": 44,
    "concepto": "WebSocket",
    "definicionCorta": "Protocolo bidireccional en tiempo real.",
    "definicionLarga": "WebSocket es un protocolo que establece una conexión persistente entre cliente y servidor, permitiendo el envío de mensajes en tiempo real sin necesidad de múltiples solicitudes HTTP.",
    "ejemplos": ["let ws = new WebSocket('ws://...')", "ws.onmessage = msg => console.log(msg)"],
    "imagen": "img/websocket-icon.png",
    "categorias": ["Web", "Backend"]
  },
  {
    "id": 45,
    "concepto": "MVC",
    "definicionCorta": "Patrón Modelo-Vista-Controlador.",
    "definicionLarga": "MVC (Modelo-Vista-Controlador) es un patrón de diseño que separa una aplicación en tres componentes: Modelo (lógica de datos), Vista (interfaz de usuario) y Controlador (gestión de eventos y flujo), facilitando la mantenibilidad y escalabilidad.",
    "ejemplos": ["Model: User; View: user.html; Controller: UserController.java"],
    "imagen": "img/mvc-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 46,
    "concepto": "MVVM",
    "definicionCorta": "Patrón Modelo-Vista-ViewModel.",
    "definicionLarga": "MVVM (Modelo-Vista-ViewModel) es un patrón de diseño que introduce una capa ViewModel que expone datos del Modelo de forma que la Vista pueda enlazarlos directamente, muy usado en frameworks como Angular y Vue para facilitar el binding bidireccional.",
    "ejemplos": ["View: template HTML; ViewModel: Vue instance; Model: JSON data"],
    "imagen": "img/mvvm-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 47,
    "concepto": "ORM",
    "definicionCorta": "Mapeo entre objetos y bases de datos.",
    "definicionLarga": "ORM (Object-Relational Mapping) es una técnica que convierte datos entre sistemas de tipos incompatibles en lenguajes de programación orientados a objetos y bases de datos relacionales.",
    "ejemplos": ["Entity Framework: DbContext; Hibernate: SessionFactory"],
    "imagen": "img/orm-icon.png",
    "categorias": ["Backend", "Programación"]
  },
  {
    "id": 48,
    "concepto": "CLI",
    "definicionCorta": "Interfaz de línea de comandos.",
    "definicionLarga": "CLI (Command-Line Interface) permite interactuar con software a través de comandos de texto en una terminal, ofreciendo control preciso y scripting automatizado.",
    "ejemplos": ["git status", "npm install express"],
    "imagen": "img/cli-icon.png",
    "categorias": ["Otros"]
  },
  {
    "id": 49,
    "concepto": "IDE",
    "definicionCorta": "Entorno de desarrollo integrado.",
    "definicionLarga": "IDE (Integrated Development Environment) es una aplicación que agrupa herramientas de programación como editor de código, depurador, compilador y gestor de versiones en un solo entorno.",
    "ejemplos": ["Visual Studio Code", "IntelliJ IDEA"],
    "imagen": "img/ide-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 50,
    "concepto": "Compiler",
    "definicionCorta": "Programa que traduce código fuente.",
    "definicionLarga": "Un compilador procesa código fuente escrito en un lenguaje de alto nivel y lo traduce a código máquina o bytecode ejecutable por la computadora o una máquina virtual.",
    "ejemplos": ["gcc main.c -o main", "javac App.java"],
    "imagen": "img/compiler-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 51,
    "concepto": "Interpreter",
    "definicionCorta": "Ejecuta código línea por línea.",
    "definicionLarga": "Un intérprete lee y ejecuta el código fuente de un programa línea por línea o instrucción por instrucción, sin generar un archivo ejecutable separado.",
    "ejemplos": ["python script.py", "node app.js"],
    "imagen": "img/interpreter-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 52,
    "concepto": "SDK",
    "definicionCorta": "Kit de desarrollo de software.",
    "definicionLarga": "Un SDK (Software Development Kit) es un conjunto de herramientas, bibliotecas y documentación que facilita la creación de aplicaciones para una plataforma específica.",
    "ejemplos": ["Android SDK", "Windows SDK"],
    "imagen": "img/sdk-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 53,
    "concepto": "Rate Limiting",
    "definicionCorta": "Control de frecuencia de peticiones.",
    "definicionLarga": "Rate Limiting limita el número de solicitudes que un cliente puede hacer a una API o servicio en un intervalo de tiempo determinado, protegiendo contra abusos y garantizando disponibilidad.",
    "ejemplos": ["100 requests/minute", "429 Too Many Requests"],
    "imagen": "img/rate-limiting-icon.png",
    "categorias": ["Backend", "Seguridad"]
  },
  {
    "id": 54,
    "concepto": "Caching",
    "definicionCorta": "Almacenamiento temporal de datos.",
    "definicionLarga": "Caching guarda temporalmente respuestas de solicitudes o resultados de operaciones costosas para acelerar accesos posteriores, reduciendo carga en servidores y latencia.",
    "ejemplos": ["Redis cache", "Browser HTTP cache"],
    "imagen": "img/caching-icon.png",
    "categorias": ["Backend", "Infraestructura"]
  },
  {
    "id": 55,
    "concepto": "CDN",
    "definicionCorta": "Red de distribución de contenido.",
    "definicionLarga": "Un CDN (Content Delivery Network) es una red de servidores distribuidos geográficamente que entregan contenido estático (imágenes, scripts, vídeo) al usuario desde el servidor más cercano.",
    "ejemplos": ["Cloudflare CDN", "Akamai"],
    "imagen": "img/cdn-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 56,
    "concepto": "DNSSEC",
    "definicionCorta": "Extensión de seguridad para DNS.",
    "definicionLarga": "DNSSEC (DNS Security Extensions) agrega autenticación criptográfica a las respuestas DNS, previniendo ataques de suplantación mediante firmas digitales y claves públicas.",
    "ejemplos": ["dig +dnssec ejemplo.com", "RRSIG records"],
    "imagen": "img/dnssec-icon.png",
    "categorias": ["Seguridad", "Redes"]
  },
  {
    "id": 57,
    "concepto": "Subnet",
    "definicionCorta": "Subdivisión lógica de una red.",
    "definicionLarga": "Una subnet (subred) es un segmento de una red IP mayor, definido por una máscara de subred, que mejora la organización y eficiencia del enrutamiento.",
    "ejemplos": ["192.168.1.0/24", "ip addr add 10.0.0.1/16"],
    "imagen": "img/subnet-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 58,
    "concepto": "Subnet Mask",
    "definicionCorta": "Máscara que define una subred.",
    "definicionLarga": "La máscara de subred indica qué parte de una dirección IP corresponde a la red y cuál al host, permitiendo dividir una red mayor en subredes más pequeñas.",
    "ejemplos": ["255.255.255.0", "/24"],
    "imagen": "img/subnet-mask-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 59,
    "concepto": "Network Gateway",
    "definicionCorta": "Punto de conexión entre redes.",
    "definicionLarga": "Un gateway de red es un dispositivo que actúa como punto de entrada o salida entre dos redes diferentes, dirigiendo el tráfico entre ellas y traduciendo protocolos si es necesario.",
    "ejemplos": ["Default Gateway 192.168.1.1", "IP forwarding enabled"],
    "imagen": "img/network-gateway-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 60,
    "concepto": "MAC Address",
    "definicionCorta": "Identificador único de hardware.",
    "definicionLarga": "La dirección MAC (Media Access Control) es un identificador único asignado a la interfaz de red de un dispositivo, usado para comunicaciones a nivel de enlace de datos.",
    "ejemplos": ["00:1A:2B:3C:4D:5E", "ip link show eth0"],
    "imagen": "img/mac-address-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 61,
    "concepto": "ARP",
    "definicionCorta": "Protocolo para resolver direcciones IP a MAC.",
    "definicionLarga": "ARP (Address Resolution Protocol) traduce direcciones IP a direcciones MAC físicas en una red local utilizando peticiones y respuestas broadcast.",
    "ejemplos": ["arp -a", "Gratuitous ARP"],
    "imagen": "img/arp-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 62,
    "concepto": "NAT",
    "definicionCorta": "Traducción de direcciones de red.",
    "definicionLarga": "NAT (Network Address Translation) permite que varios dispositivos en una red privada compartan una única dirección IP pública, reescribiendo cabeceras de paquetes en un router.",
    "ejemplos": ["iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE"],
    "imagen": "img/nat-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 63,
    "concepto": "Ping",
    "definicionCorta": "Herramienta de prueba de conectividad.",
    "definicionLarga": "Ping envía paquetes ICMP Echo Request a un host de destino y espera Echo Reply para medir latencia y verificar que el destino es alcanzable en la red.",
    "ejemplos": ["ping 8.8.8.8", "ping -c 4 ejemplo.com"],
    "imagen": "img/ping-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 64,
    "concepto": "Traceroute",
    "definicionCorta": "Rastrea la ruta de paquetes en la red.",
    "definicionLarga": "Traceroute (o tracert en Windows) muestra cada salto que un paquete realiza desde el origen hasta el destino, ayudando a diagnosticar problemas de ruta y latencia.",
    "ejemplos": ["traceroute google.com", "tracert ejemplo.com"],
    "imagen": "img/traceroute-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 65,
    "concepto": "SSH",
    "definicionCorta": "Protocolo de acceso seguro a terminal.",
    "definicionLarga": "SSH (Secure Shell) proporciona un canal cifrado sobre una red insegura para ejecutar comandos de forma remota, túneles seguros y transferencia de archivos.",
    "ejemplos": ["ssh usuario@servidor", "scp archivo.txt usuario@servidor:/ruta/"],
    "imagen": "img/ssh-icon.png",
    "categorias": ["Seguridad", "Infraestructura"]
  },
  {
    "id": 66,
    "concepto": "FTP",
    "definicionCorta": "Protocolo de transferencia de archivos.",
    "definicionLarga": "FTP (File Transfer Protocol) permite la transferencia de archivos entre cliente y servidor usando conexiones separadas para control y datos, aunque es menos seguro que SFTP.",
    "ejemplos": ["ftp ejemplo.com", "put archivo.txt"],
    "imagen": "img/ftp-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 67,
    "concepto": "SFTP",
    "definicionCorta": "FTP sobre SSH para transferencia segura.",
    "definicionLarga": "SFTP (SSH File Transfer Protocol) usa el túnel SSH para transferir archivos de manera cifrada, ofreciendo autenticación y confidencialidad en cada sesión.",
    "ejemplos": ["sftp usuario@servidor", "get archivo.txt"],
    "imagen": "img/sftp-icon.png",
    "categorias": ["Seguridad", "Infraestructura"]
  },
  {
    "id": 68,
    "concepto": "SMB",
    "definicionCorta": "Protocolo de recursos compartidos de Windows.",
    "definicionLarga": "SMB (Server Message Block) permite compartir archivos, impresoras y puertos seriales en redes Windows, también usado por Samba en Linux para interoperar con sistemas Windows.",
    "ejemplos": ["//servidor/carpeta", "mount -t cifs //servidor/carpeta /mnt"],
    "imagen": "img/smb-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 69,
    "concepto": "LDAP",
    "definicionCorta": "Protocolo de acceso a directorios.",
    "definicionLarga": "LDAP (Lightweight Directory Access Protocol) es un protocolo para acceder y mantener servicios de directorio, típicamente usado para autenticar usuarios y consultar información de red.",
    "ejemplos": ["ldapsearch -x -h servidor -b dc=ejemplo,dc=com"],
    "imagen": "img/ldap-icon.png",
    "categorias": ["Backend", "Seguridad"]
  },
  {
    "id": 70,
    "concepto": "SMTP",
    "definicionCorta": "Protocolo de envío de correo electrónico.",
    "definicionLarga": "SMTP (Simple Mail Transfer Protocol) define cómo transferir mensajes de correo electrónico entre servidores y desde clientes a servidores de correo saliente.",
    "ejemplos": ["HELO servidor", "MAIL FROM:<usuario@ejemplo.com>"],
    "imagen": "img/smtp-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 71,
    "concepto": "IMAP",
    "definicionCorta": "Protocolo de acceso a correo desde servidor.",
    "definicionLarga": "IMAP (Internet Message Access Protocol) permite a los clientes acceder y gestionar correos electrónicos directamente en el servidor, manteniendo sincronización entre múltiples dispositivos.",
    "ejemplos": ["LOGIN usuario contraseña", "SELECT INBOX"],
    "imagen": "img/imap-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 72,
    "concepto": "POP3",
    "definicionCorta": "Protocolo de descarga de correo.",
    "definicionLarga": "POP3 (Post Office Protocol 3) descarga correos electrónicos del servidor al cliente y, opcionalmente, los elimina del servidor, ideal para acceder desde un único dispositivo.",
    "ejemplos": ["USER usuario", "RETR 1"],
    "imagen": "img/pop3-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 73,
    "concepto": "VoIP",
    "definicionCorta": "Voz sobre protocolo IP.",
    "definicionLarga": "VoIP (Voice over IP) permite la transmisión de voz y multimedia a través de redes IP, usando protocolos como SIP y RTP para establecer llamadas y sesiones de audio/video.",
    "ejemplos": ["SIP INVITE", "RTP stream"],
    "imagen": "img/voip-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 74,
    "concepto": "Webhook",
    "definicionCorta": "Callback HTTP para eventos.",
    "definicionLarga": "Un webhook es un mecanismo que envía una petición HTTP a una URL configurada cuando ocurre un evento en un sistema, permitiendo la integración en tiempo real entre servicios.",
    "ejemplos": ["GitHub webhook: push event", "POST /webhook"],
    "imagen": "img/webhook-icon.png",
    "categorias": ["Backend"]
  },
  {
    "id": 75,
    "concepto": "Latency",
    "definicionCorta": "Retraso en la transmisión de datos.",
    "definicionLarga": "La latencia mide el tiempo que tarda un paquete de datos en viajar desde el origen al destino, afectando la percepción de velocidad en aplicaciones en tiempo real.",
    "ejemplos": ["ping -c 1 ejemplo.com → 30ms", "RTT (Round-Trip Time)"],
    "imagen": "img/latency-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 76,
    "concepto": "TTL",
    "definicionCorta": "Tiempo de vida de un paquete.",
    "definicionLarga": "TTL (Time To Live) es un campo en el encabezado IP que indica el número máximo de saltos que un paquete puede dar antes de ser descartado, previniendo bucles de red.",
    "ejemplos": ["ping -t 64 ejemplo.com", "Traceroute muestra TTL decreciente"],
    "imagen": "img/ttl-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 77,
    "concepto": "Throughput",
    "definicionCorta": "Tasa de transferencia de datos.",
    "definicionLarga": "El throughput representa la cantidad de datos útiles que se transmiten por unidad de tiempo en una red o sistema, clave para medir el rendimiento de transferencias.",
    "ejemplos": ["iperf -c servidor", "100 Mbps sustentables"],
    "imagen": "img/throughput-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 78,
    "concepto": "Packet",
    "definicionCorta": "Unidad básica de datos en red.",
    "definicionLarga": "Un paquete es la unidad de datos formada por un encabezado y una carga útil que viaja por la red, transportando información entre nodos en redes IP.",
    "ejemplos": ["Wireshark capture", "TCP segment encapsulated"],
    "imagen": "img/packet-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 79,
    "concepto": "Subnetting",
    "definicionCorta": "Dividir redes en subredes.",
    "definicionLarga": "Subnetting es el proceso de subdividir una red IP mayor en redes más pequeñas o subredes, optimizando el uso de direcciones y mejorando la seguridad y gestión.",
    "ejemplos": ["192.168.0.0/24 → /26 subnets", "CIDR notation"],
    "imagen": "img/subnetting-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 80,
    "concepto": "VLAN",
    "definicionCorta": "Red local virtual segmentada.",
    "definicionLarga": "Una VLAN (Virtual LAN) es una partición lógica de una red física que agrupa dispositivos en dominios de broadcast separados, mejorando seguridad y rendimiento.",
    "ejemplos": ["switchport access vlan 10", "802.1Q tagging"],
    "imagen": "img/vlan-icon.png",
    "categorias": ["Redes"]
  },
  {
    "id": 81,
    "concepto": "RAID",
    "definicionCorta": "Conjunto de discos para tolerancia a fallos y rendimiento.",
    "definicionLarga": "RAID (Redundant Array of Independent Disks) agrupa varios discos duros para mejorar rendimiento, redundancia o ambos, usando niveles como RAID 0, RAID 1, RAID 5, etc.",
    "ejemplos": ["RAID 1: espejo de discos", "RAID 5: paridad distribuida"],
    "imagen": "img/raid-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 82,
    "concepto": "SSD",
    "definicionCorta": "Unidad de estado sólido de almacenamiento.",
    "definicionLarga": "SSD (Solid State Drive) utiliza memoria flash en lugar de platos giratorios y cabezales magnéticos, ofreciendo mayor velocidad de lectura/escritura y menor latencia que los HDD tradicionales.",
    "ejemplos": ["Lectura aleatoria: ~100,000 IOPS", "SATA vs NVMe"],
    "imagen": "img/ssd-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 83,
    "concepto": "HDD",
    "definicionCorta": "Disco duro magnético convencional.",
    "definicionLarga": "HDD (Hard Disk Drive) almacena datos en platos giratorios y cabezales magnéticos, ofreciendo gran capacidad a menor costo pero con velocidades de acceso inferiores al SSD.",
    "ejemplos": ["7200 RPM", "2 TB SATA HDD"],
    "imagen": "img/hdd-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 84,
    "concepto": "Git",
    "definicionCorta": "Sistema de control de versiones distribuido.",
    "definicionLarga": "Git es un VCS (Version Control System) que permite llevar el historial de cambios de archivos, trabajar en ramas y fusionar desarrollos de manera distribuida.",
    "ejemplos": ["git commit -m \"mensaje\"", "git branch nueva-rama"],
    "imagen": "img/git-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 85,
    "concepto": "GitHub",
    "definicionCorta": "Plataforma de alojamiento de repositorios Git.",
    "definicionLarga": "GitHub es un servicio web que facilita la colaboración en proyectos Git, ofreciendo repositorios remotos, pull requests, Issues, Actions y páginas estáticas con Pages.",
    "ejemplos": ["git push origin main", "abrir un pull request"],
    "imagen": "img/github-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 86,
    "concepto": "Bitbucket",
    "definicionCorta": "Repositorio Git y Mercurial en la nube.",
    "definicionLarga": "Bitbucket es una plataforma de Atlassian que aloja proyectos Git o Mercurial, con integración a Jira, pipelines CI/CD y gestión de permisos por equipo.",
    "ejemplos": ["bbcli clone <url>", "Bitbucket Pipelines YAML"],
    "imagen": "img/bitbucket-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 87,
    "concepto": "Semantic Versioning",
    "definicionCorta": "Convención de versionado MAJOR.MINOR.PATCH.",
    "definicionLarga": "SemVer define un formato de versión de tres números: MAJOR para cambios incompatibles, MINOR para nuevas funcionalidades compatibles y PATCH para correcciones de errores.",
    "ejemplos": ["1.4.2 → 1.5.0 → 2.0.0"],
    "imagen": "img/semantic-versioning-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 88,
    "concepto": "Feature Flag",
    "definicionCorta": "Bandera para activar/desactivar funcionalidades.",
    "definicionLarga": "Un feature flag es un mecanismo de control que permite habilitar o deshabilitar características de software en tiempo de ejecución sin desplegar nuevo código.",
    "ejemplos": ["flags.uiLogin=true", "Lanzamiento progresivo (canary)"],
    "imagen": "img/feature-flag-icon.png",
    "categorias": ["Backend"]
  },
  {
    "id": 89,
    "concepto": "A/B Testing",
    "definicionCorta": "Comparación de dos versiones para optimizar.",
    "definicionLarga": "A/B Testing consiste en mostrar dos variaciones de una interfaz a distintos segmentos de usuarios para medir cuál genera mejores métricas (conversiones, clics...).",
    "ejemplos": ["Versión A vs Versión B", "Google Optimize experiment"],
    "imagen": "img/ab-testing-icon.png",
    "categorias": ["Frontend", "Otros"]
  },
  {
    "id": 90,
    "concepto": "Unit Test",
    "definicionCorta": "Prueba de unidad de código individual.",
    "definicionLarga": "Los unit tests verifican de forma aislada el comportamiento de funciones o clases específicas, facilitando la detección temprana de errores y garantizando calidad de lógica interna.",
    "ejemplos": ["JUnit @Test", "jest('suma', () => {...})"],
    "imagen": "img/unit-test-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 91,
    "concepto": "Integration Test",
    "definicionCorta": "Prueba de integración entre componentes.",
    "definicionLarga": "Los integration tests evalúan la interacción entre múltiples unidades o módulos de la aplicación para asegurar que trabajan correctamente en conjunto.",
    "ejemplos": ["Probar endpoints REST", "Selenium WebDriver tests"],
    "imagen": "img/integration-test-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 92,
    "concepto": "Regression Test",
    "definicionCorta": "Prueba para detectar regresiones.",
    "definicionLarga": "Los regression tests se ejecutan después de cambios en el código para confirmar que las funcionalidades existentes no se han roto con las nuevas modificaciones.",
    "ejemplos": ["Suite de pruebas automatizada", "Re-run on merge"],
    "imagen": "img/regression-test-icon.png",
    "categorias": ["Programación"]
  },
  {
    "id": 93,
    "concepto": "Load Testing",
    "definicionCorta": "Prueba de rendimiento bajo carga.",
    "definicionLarga": "Load testing mide el comportamiento de una aplicación cuando varios usuarios o transacciones acceden simultáneamente, evaluando tiempos de respuesta y estabilidad.",
    "ejemplos": ["jMeter load test", "k6 run script.js"],
    "imagen": "img/load-testing-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 94,
    "concepto": "Terraform",
    "definicionCorta": "Infraestructura como código declarativa.",
    "definicionLarga": "Terraform permite definir, provisionar y gestionar recursos de nube y servicios usando archivos de configuración en un lenguaje HCL, manteniendo el estado deseado de la infraestructura.",
    "ejemplos": ["terraform init", "terraform apply -auto-approve"],
    "imagen": "img/terraform-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 95,
    "concepto": "Ansible",
    "definicionCorta": "Automatización de configuración y despliegue.",
    "definicionLarga": "Ansible es una herramienta de automatización que usa playbooks YAML para gestionar configuración, despliegue de aplicaciones y orquestación de infraestructuras sin agentes.",
    "ejemplos": ["ansible-playbook site.yml", "hosts: webservers"],
    "imagen": "img/ansible-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 96,
    "concepto": "Monitoring",
    "definicionCorta": "Supervisión de sistemas y servicios.",
    "definicionLarga": "Monitoring implica recopilar métricas (CPU, memoria, latencia) y logs para detectar anomalías, generar alertas y visualizar el estado de aplicaciones e infraestructuras.",
    "ejemplos": ["Prometheus scraping", "Nagios alerts"],
    "imagen": "img/monitoring-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 97,
    "concepto": "ELK Stack",
    "definicionCorta": "Conjunto de ElasticSearch, Logstash y Kibana.",
    "definicionLarga": "ELK Stack combina ElasticSearch para búsqueda, Logstash para ingestión y Kibana para visualización de logs y datos, facilitando análisis y monitoreo centralizado.",
    "ejemplos": ["logstash.conf pipeline", "Kibana dashboard"],
    "imagen": "img/elk-stack-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 98,
    "concepto": "Message Queue",
    "definicionCorta": "Cola de mensajes para desacoplar servicios.",
    "definicionLarga": "Una Message Queue almacena mensajes en cola para que productores y consumidores se comuniquen asíncronamente, mejorando escalabilidad y resiliencia de microservicios.",
    "ejemplos": ["RabbitMQ queue", "AWS SQS"],
    "imagen": "img/message-queue-icon.png",
    "categorias": ["Backend", "Infraestructura"]
  },
  {
    "id": 99,
    "concepto": "Docker Compose",
    "definicionCorta": "Definición de multi-contenedores Docker.",
    "definicionLarga": "Docker Compose usa un archivo YAML para definir y ejecutar múltiples contenedores Docker relacionados como un único servicio, facilitando entornos de desarrollo reproducibles.",
    "ejemplos": ["docker-compose up -d", "services: web, db"],
    "imagen": "img/docker-compose-icon.png",
    "categorias": ["Infraestructura"]
  },
  {
    "id": 100,
    "concepto": "API Versioning",
    "definicionCorta": "Gestión de versiones de APIs.",
    "definicionLarga": "API Versioning consiste en mantener múltiples versiones de una API (v1, v2) para asegurar compatibilidad con clientes antiguos mientras se introducen mejoras o breaking changes.",
    "ejemplos": ["/api/v1/users", "/api/v2/users?fields=name,email"],
    "imagen": "img/api-versioning-icon.png",
    "categorias": ["Backend"]
  }
];

require('dotenv').config();

async function migrarDatos() {
  try {
    console.log('🔗 Conectando a MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar colección existente
    console.log('🧹 Limpiando colección existente...');
    await Termino.deleteMany({});
    console.log('✅ Colección limpiada');

    // Insertar nuevos datos
    console.log('📥 Insertando términos...');
    await Termino.insertMany(terminosData);
    console.log(`✅ ${terminosData.length} términos migrados exitosamente`);

    // Verificar
    const count = await Termino.countDocuments();
    console.log(`📊 Total de términos en la base de datos: ${count}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error migrando datos:', error);
    process.exit(1);
  }
}

migrarDatos();