import subprocess
import socket
import re

# Ejecutar el comando netstat y capturar la salida
result = subprocess.run(['netstat', '-n'], capture_output=True, text=True)
netstat_output = result.stdout

# Buscar direcciones IP y puertos activos utilizando expresiones regulares
pattern = re.compile(r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}:[0-9]+\b')
matches = pattern.findall(netstat_output)
ip_addresses = [match.split(':')[0] for match in matches]

# Resolver cada dirección IP a un nombre de host
contador = 0
hostnames = {}
for ip in ip_addresses:
    if contador == 10:
        break	        
    try:
        contador=+1
        hostname, _, _ = socket.gethostbyaddr(ip)
        print(hostname + " " + ip)
        hostnames[ip] = hostname
        
    except socket.herror:
        hostnames[ip] = "No se pudo resolver"

# Imprimir los resultados
for ip, hostname in hostnames.items():
    print(f"{ip}: {hostname}")
