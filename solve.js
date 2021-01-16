function solve(input) {
    let users = {};
    let actions = {

        New(users, name) {
            if (users[name] != undefined) {
            } else {
                users[name] = {
                    'likes': 0,
                    'comments': 0
                };
            }

        },
        Like(users, name, likes) {
            likes = Number(likes);
            if (users[name] != undefined) {
                users[name]['likes'] += likes;
            } else {
                users[name] = {
                    'likes': likes,
                    'comments': 0
                }
            }

        },
        Comment(users, name, likes) {
            likes = Number(likes);
            if (users[name] != undefined) {
                users[name]['comments'] += 1;
            } else {
                users[name] = {
                    'likes': 0,
                    'comments': 1
                }
            }

        },
        Blocked(users, name) {
            if(users[name] != undefined){
                delete users[name];
            } else {
                console.log(`${name} doesn't exist.`);            }

        }
    }

    let line;
    while ((line = input.shift()) != "Log out") {
        let [command, name, ...params] = line.split(": ");
        // console.log(`command is ${command} ${name} params ${params}`)
        if(command == "New follower"){
            command = "New";
        }
        // console.log(command);
        actions[command](users, name, ...params);
    }

    let sorted = Object.entries(users);
    sorted.sort(compare);
    console.log(sorted.length + " followers");
    sorted.forEach(user => {
        console.log(`${user[0]}: ${user[1][`likes`]+user[1][`comments`]}`);
    });

    function compare(a, b) {
        return (b[1].likes + b[1].comments) - (a[1].likes + a[1].comments) || a[0].localeCompare(b[0]);
    }

}
// solve([
//     'New follower: gosho',
//     'Like: gosho: 5',
//     'Comment: gosho',
//     'New follower: gosho',
//     'New follower: tosho',
//     'Comment: gosho',
//     'Comment: tosho',
//     'Comment: pesho',
//     'Log out'
// ]);
console.log("-----");
solve([
    'New follower: B',
    'Log out'
]
);
