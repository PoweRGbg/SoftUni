async function lockedProfile() {
    const url = `http://localhost:3030/jsonstore/advanced/profiles`;
    let info = document.getElementsByClassName('info')[0];
    const main = document.getElementById('main');
    main.innerHTML = '';
    try {
        let response = await fetch(url);
        profiles = await response.json();
        Object.values(profiles).forEach(profile => {
            // console.log(profile);
            const div = e('div', { className: 'profile' });
            let inner = `<img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label>
            <input type="radio" name="${profile._id}Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="${profile._id}Locked" value="unlock"><br>
            <hr>
            <label>${profile.username}</label>
            <input type="text" name="${profile.username}" value="${profile.username}" disabled readonly />
            <div id="${profile._id}HiddenFields">
                <hr>
                <label>Email:</label>
                <input type="email" name="${profile.email}" value="${profile.email}" disabled readonly />
                <label>Age:</label>
                <input type="email" name="${profile.age}" value="${profile.age}" disabled readonly />
            </div>`;

            div.innerHTML = inner;
            let buttton = e('button', {'onClick':showMore}, 'Show more');
            let hidden  = div.getElementsByTagName('div')[0];
            hidden.style.display = 'none';

            div.appendChild(buttton);
            main.appendChild(div);
        });
    } catch (error) {
    }
    function showMore(event){
        const div = event.target.parentNode;
        const locked = div.getElementsByTagName('input');
        let checked = Array.from(locked).filter(el => el.checked != false);
        if(checked[0].value != 'lock'){
            const showMore = div.getElementsByTagName('div')[0];
            const btn = div.getElementsByTagName('button')[0];
            if(btn.innerText == 'Hide it'){
                showMore.style.display = 'none';
                btn.innerText = 'Show more'
            } else {
                showMore.style.display = '';
                btn.innerText = 'Hide it'

            }
        }
        console.log(`clicked`);
    }
    function e(type, attributes = {}, ...content) {
        const result = document.createElement(type);

        for (let attr in attributes) {
            if (attr.substring(0, 2) == 'on') {
                result.addEventListener(attr.substring(2).toLowerCase(), attributes[attr]);
            } else {
                result[attr] = attributes[attr];
            }
        }

        content.forEach(e => {
            if (typeof e == 'string' || typeof e == 'number') {
                const node = document.createTextNode(e);
                result.appendChild(node);
            } else {
                result.appendChild(e);
            }
        });

        return result;
    }
}