# Source ref : https://raspberry-lab.fr/Composants/Module-L298N-controleur-moteur-Raspberry-Francais/?repID=481

# Lien intéressant : https://www.raspberrypi.com/documentation/computers/raspberry-pi.html

import RPi.GPIO as GPIO
from time import sleep
import socketio

# Definition des pins
M1_EN = 25
M1_IN1 = 8
M1_IN2 = 7

M2_EN = 18
M2_IN1 = 14
M2_IN2 = 15

M3_EN = 26
M3_IN1 = 19
M3_IN2 = 13

M4_EN = 17
M4_IN1 = 22
M4_IN2 = 27

# Tableau afin de regrouper les pins par moteur
Pins = [[M1_EN, M1_IN1, M1_IN2], [M2_EN, M2_IN1, M2_IN2], [M3_EN, M3_IN1, M3_IN2], [M4_EN, M4_IN1, M4_IN2]]

# Démarrage
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

GPIO.setup(M1_EN, GPIO.OUT)
GPIO.setup(M1_IN1, GPIO.OUT)
GPIO.setup(M1_IN2, GPIO.OUT)

GPIO.setup(M2_EN, GPIO.OUT)
GPIO.setup(M2_IN1, GPIO.OUT)
GPIO.setup(M2_IN2, GPIO.OUT)

GPIO.setup(M3_EN, GPIO.OUT)
GPIO.setup(M3_IN1, GPIO.OUT)
GPIO.setup(M3_IN2, GPIO.OUT)

GPIO.setup(M4_EN, GPIO.OUT)
GPIO.setup(M4_IN1, GPIO.OUT)
GPIO.setup(M4_IN2, GPIO.OUT)

frequence = 100         # À voir avec le moteur
rapportCyclique = 100   # À voir avec le moteur
M1_vitesse = GPIO.PWM(M1_EN, frequence)
M2_vitesse = GPIO.PWM(M2_EN, frequence)
M3_vitesse = GPIO.PWM(M3_EN, frequence)
M4_vitesse = GPIO.PWM(M4_EN, frequence)
M1_vitesse.start(rapportCyclique)
M2_vitesse.start(rapportCyclique)
M3_vitesse.start(rapportCyclique)
M4_vitesse.start(rapportCyclique)


def sens1(moteurNum):
    GPIO.output(Pins[moteurNum - 1][1], GPIO.LOW)
    GPIO.output(Pins[moteurNum - 1][2], GPIO.HIGH)
    # print("Moteur", moteurNum, "tourne dans le sens 1.")
    
    
def sens2(moteurNum):
    GPIO.output(Pins[moteurNum - 1][1], GPIO.HIGH)
    GPIO.output(Pins[moteurNum - 1][2], GPIO.LOW)
    # print("Moteur", moteurNum, "tourne dans le sens 2.")


def arreter(moteurNum):
    GPIO.output(Pins[moteurNum - 1][1], GPIO.LOW)
    GPIO.output(Pins[moteurNum - 1][2], GPIO.LOW)


def avancer():
    sens1(1)
    sens1(2)
    sens2(3)
    sens2(4)
    # print("Bolide avance")

def reculer():
    sens2(1)
    sens2(2)
    sens1(3)
    sens1(4)
    # print("Bolide recule")
    
def avantGauche():
    arreter(1)
    sens1(2)
    sens2(3)
    sens2(4) 
    
    
def avantDroite():
    sens1(1)
    arreter(2)
    sens2(3)
    sens2(4) 
    

def reculerGauche():
    sens2(1)
    sens2(2)
    sens1(3)
    arreter(4)    


def reculerDroite():
    sens2(1)
    sens2(2)
    arreter(3)
    sens1(4)
    

def arreterTout():
    arreter(1)
    arreter(2)
    arreter(3)
    arreter(4)
    # print("Moteurs arretes.")

arreterTout()
    
while True :
    # Exemple de motif de boucle
    reculerDroite()
    sleep(10)
    arreterTout()
    sleep(5)
# Create a Socket.IO client

sio = socketio.Client()

@sio.event
def connect():
    print('Connected to Node.js server')

@sio.event
def disconnect():
    print('Disconnected from Node.js server')

@sio.event
def command(data):
    print('Received command:', data)
    # Execute the command on the Raspberry Pi (implement your logic here)
    if data == 'up':
        # Code to move the robot forward
        pass
    elif data == 'down':
        # Code to move the robot backward
        pass
    elif data == 'left':
        # Code to turn the robot left
        pass
    elif data == 'right':
        # Code to turn the robot right
        pass
    else:
        # Stop motors or handle any other default action
        pass

# Connect to the Node.js WebSocket server
sio.connect('http://localhost:8081')

# Keep the script running
sio.wait()

