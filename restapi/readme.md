# Serverside programmering H3, Casper Pedersen

## Teacher: Mads Bock

### Assigment requirements(In danish)

Du skal programmere en REsT API som fungerer som et lokale booking system. Dataen skal sendes til klienten i .json format.

1. Når man går ind på /rooms skal man modtage en oversigt over lokaler i systemet.

2. Når man går ind på /bookings skal man modtage en oversigt over alle bookinger der er aktive idag. Man skal kunne ændre GET parametrene således at man kan få for en anden dag. (f.eks. hvis man går ind på "/bookings?day=14" så får man bookingen for d. 14. i måneden)

3. Hvis man sender en POST request til /add kan man tilføje en ny booking til systemet. Hvis det ikke er en POST request skal der ikke ske noget.

4. Lav et id-system for API'en. Den der vil tilgå den skal have en key, som skal sendes med som parameter når man tilgår API'en

### I've made a system which fits the needs described above. It can be found in this repo

***To run any API calls, you need to provide a valid api key with the ?apikey=[apikey] query parameter, those can be found in ./data/apikeys.json.***
**Run the server with nodejs, using the ./server.js file**

#### Available API queries

* GET localhost/firsttimesetup This will add sample data to the system(./data/bookings.json and ./data/rooms.json). The bookings will be of todays date

* GET localhost/rooms This will return all the rooms found in ./data/rooms.json

* GET localhost/bookings This will return bookings of todays date. Use the ?day=[1-31] to get a specific day of the month

* POST localhost/add This can be used to add a new booking to the system. Example: <http://localhost/add?date=1&room=Square&person=Casper&time=23:12&apikey=1337>
