(function solve() {
    String.prototype.ensureStart = function (newStr) {
        if (!this.startsWith(newStr)) {
            return (newStr + this).toString();
        } else {
            return this.toString();
        }
    };
    String.prototype.ensureEnd = function (newStr) {
        if (!this.endsWith(newStr)) {
            return (this + newStr).toString();
        } else {
            return this.toString();
        }
    };

    String.format = function (string, ...params) {
        let result = string;

        for (let index = 0; index < params.length; index++) {
            const element = params[index];
            // scan for indexes in curly braces 
            let startPos = result.indexOf('{');
            let endPos = result.indexOf('}');
            let pos = Number(result.substring(startPos + 1, endPos));
            if (params[pos] != undefined && startPos != -1 && endPos != -1) {
                // replace with corresponding index from params
                result = result.substring(0, startPos) + params[pos] + result.substring(endPos + 1);
            }


        }
        // return resulting string
        return result;
    };
    String.prototype.isEmpty = function () {
        return this == '';
    };

    String.prototype.truncate = function (n) {
        if (n < 4) {
            return '.'.repeat(n);
        }
        if (this.length <= n) {
            return this.toString();
        } else {
            let result = this.substring(0, n).split(' ');
            let concatArr = [];
            if (result.length > 1) {
                for (let index = 0; index < result.length-1; index++) {
                    concatArr.push(result[index]);
                }
                while((concatArr.join(' ')+'...').length > n){
                    concatArr.pop();
                }
                return concatArr.join(' ')+'...';
            } else {
                return this.substring(0, n - 3) + '...';
            }
        }
    };

    // let str = 'the quick brown fox jumps over the lazy dog';
    // console.log(str.truncate(10));
    // console.log(str.truncate(43));
    // console.log(str.truncate(6));
    // console.log(str.truncate(12));
    
}())

solve();