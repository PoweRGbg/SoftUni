function solve(steps, stepLength, speed){
    let distance = steps * stepLength; // in meters
    const pauses = Math.floor(distance / 500);
    let spMetSeconds = (speed * 1000) / (60*60);
    let hours = Math.floor(distance / (speed * 1000));
    let minutes = Math.floor((distance/(speed * 1000))*60 - hours*60) % 60; // dont forget pauses.
    let seconds = (distance/(speed*1000)*3600);
    seconds -= hours*3600;
    seconds -= minutes*60;
    seconds = Math.ceil(seconds);
    if(minutes+pauses < 10){
        minutes = "0"+minutes+pauses;
    }
    if(seconds < 10){
        seconds = "0"+seconds;
    }
    console.log(`0${hours}:${minutes+pauses}:${seconds}`);
}

solve(4000,0.60,5);
solve(2564,0.70,5.5);