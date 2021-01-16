function solve(input) {
    let users = {};
    let actions = {

        New(users, name) {
            if (users[name] == undefined) {
                users[name] = {
                    'likes': 0,
                    'comments': 0
                }
            } else {
                // ignore
            }
        },
        Comment(users, name) {
            if (users[name] == undefined) {
                users[name] = {
                    'likes': 0,
                    'comments': 1
                }
            } else {
                users[name]['comments'] = users[name]['comments'] + 1;
            }
        },
        Like(users, name, likes) {
            if (users[name] == undefined) {
                users[name] = {
                    'likes': Number(likes),
                    'comments': 0
                }
            } else {
                users[name]['likes'] = users[name]['likes'] + Number(likes);
            }
        },
        Blocked(users, name) {
            if (users[name] != undefined) {
                delete users[name];
            } 
        }
    }

    let line;
    while ((line = input.shift()) != "Log out") {
        let [command, user, ...params] = line.split(": ");
        command = command.split(" ");
        actions[command[0]](users, user, ...params);
    }

    let sorted = Object.entries(users);
    sorted.sort(compare);
    if (sorted.length > 0) {
        console.log(`${sorted.length} followers`);
        sorted.forEach(user => {
            console.log(`${user[0]}: ${user[1][`likes`]+user[1]['comments']}`);
        });

    } else {

    }

    function compare(a, b) {
        return (b[1].comments + b[1].likes) - (a[1].comments + a[1].likes) || a[0].localeCompare(b[0]);
    }

}
