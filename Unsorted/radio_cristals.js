function solve(input1) {
    let desiredSize = Number(input1.shift());
    let currentSize;
    let xRayed = false;
    let cuts = 0;
    let grinds = 0;
    let laps = 0;
    let etches = 0;
    
    while(currentSize =input1.shift()){
        processChunk();
    }

    function processChunk(){
        console.log(`Processing chunk ${currentSize} microns`);
        while( desiredSize < currentSize){
            if(currentSize / desiredSize >= 4){
                cut();
                continue;
            } else if(cuts){
                displayOpperation();
            } else if(currentSize * 0.8 >= desiredSize){
                lap();
                continue;
            } else if(laps){
                displayOpperation();
            }else if(currentSize - 20 >= desiredSize){
                grind();
                continue;
            }else if(grinds){
                displayOpperation();
            } else if(currentSize >= desiredSize){
                etch();
                continue;
            } else if(etches){
                displayOpperation();
            }
            showCurrentSize();
        }
        if (cuts || laps || grinds || etches){
            displayOpperation();
        }
    
        if(desiredSize - currentSize > 0){
            xRay();
            console.log(`X-ray x1`);
        }
        if(desiredSize == currentSize){
            console.log(`Finished crystal ${currentSize} microns`);
        }
    }

    function showCurrentSize(){
        // console.log(`Current size is: ${currentSize}(${currentSize-desiredSize})`);
    }
    function xRay() {
        if (xRayed)
            return;
        else {
            xRayed = true;
            currentSize += 1;
        }
    }

    function displayOpperation(){
        if(cuts) {
            console.log(`Cut x${cuts}`);
            cuts = 0;
            transportAndWash();
            showCurrentSize();
        } 
        if(laps){
            console.log(`Lap x${laps}`);
            laps = 0;
            showCurrentSize();
            transportAndWash();
        }
        if(grinds){
            console.log(`Grind x${grinds}`);
            grinds = 0;
            showCurrentSize();
            transportAndWash();
        } 
        if(etches){
            console.log(`Etch x${etches}`);
            grinds = 0;
            showCurrentSize();
            transportAndWash();
        }
    }

    function transportAndWash() {
        currentSize = Math.floor(currentSize);
        console.log(`Transporting and washing`);
    }

    function cut() {
        currentSize = currentSize / 4;
        cuts++;
    }

    function grind(){
        currentSize -= 20;
        grinds++;
    }

    function lap(){
        currentSize *= 0.8;
        laps++;
    }

    function etch(){
        currentSize -= 2;
        etches++;
    }
}
solve([1000, 4000, 8100]);