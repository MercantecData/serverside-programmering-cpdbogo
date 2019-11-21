# Serverside programmering H3, Casper Pedersen

## Teacher: Mads Bock

### Assigment requirements(In danish)

1. Lav en lille server som kan sætte en cookie i browseren med "set-cookie" headeren. Verificer at browseren, efter cookies er sat, returnerer denne cookie under headeren "cookie"

2. Gør at serveren nu sætter to cookies. Verificer at begge cookies bliver sat. Verificer også at begge cookies forsvinder når browseren lukkes.

3. Lav en funktion serverside som kan splitte cookie-strengen op så den returnerer de forskellige cookies i et let-programmerbart format (f.eks som et JS object eller JS array)

4. Lav nu en cookie som ikke forsvinder når programmet lukkes. Enten ved at sætte "Max-Age" eller "Expires"

### I've made a small nodejs server that fits the needs listed above, to run it, run node with ./server.js

#### API endpoints

* GET localhost/singlecookie        -Sets a single cookie in the browser

* GET localhost/doublecookie        -Sets two cookies in the browser

* GET localhost/showmethecookies    -Outputs cookies from the request in the nodejs console

* GET localhost/expiringcookie       -Sets a cookie that expires in 24 hours
