# Source : https://www.cours-gratuit.com/tutoriel-python/tutoriel-python-les-bases-de-traitement-dimages-en-python-opencv#_Toc56677920
#          https://docs.opencv.org/4.9.0/dd/d43/tutorial_py_video_display.html
#          https://datacorner.fr/reco-faciale-opencv-2/
# Fichier xml d'OpenCV : https://github.com/opencv/opencv/blob/3.4/data/haarcascades/haarcascade_frontalface_default.xml

import cv2 as cv


def facialDetectionAndMark(_image, _classCascade):
    copyImg = _image.copy()
    grey_image = cv.cvtColor(copyImg, cv.COLOR_RGB2GRAY)
    faces = _classCascade.detectMultiScale(grey_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30),
                                           flags=cv.CASCADE_SCALE_IMAGE)
    # print("Nombre de visages détecté dans l’image: {0}".format(len(faces)))
    for (x, y, w, h) in faces:
        cv.rectangle(copyImg, (x, y), (x + w, y + h), (0, 255, 0), 2)
    return copyImg


haar_file = 'haarcascade_frontalface_default.xml'
face_cascade = cv.CascadeClassifier(haar_file)

cap = cv.VideoCapture(0)
if not cap.isOpened():
    print("Cannot open camera")
    exit()
while True:
    # Capture frame-by-frame
    state, frame = cap.read()
    # if frame is read correctly ret is True
    if not state:
        print("Can't receive frame (stream end?). Exiting ...")
        break
    # Display the resulting frame
    frameToShow = facialDetectionAndMark(frame, face_cascade)
    cv.imshow('Webcam', frameToShow)
    if cv.waitKey(1) == ord('q'):
        break
# When everything done, release the capture
cap.release()
cv.destroyAllWindows()
