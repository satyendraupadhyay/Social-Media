const form = document.getElementById('my-form');

form.addEventListener('submit', function postDetails(event) {
    event.preventDefault();
    
    const link = event.target.link.value;
    const description = event.target.description.value;

    const obj = {
        link,
        description
    };


    axios.post("http://localhost:3000/socialmedia/add-sm", obj)
    .then((response) => {
        console.log(response);
        showUser(response.data.newSmDetail);
    })
    .catch((err) => {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something went wrong</h4>"
        console.log(err);
    })

});

function showUser(postDetails) {
    const parent = document.getElementById('imagecontainer');
    const postId = postDetails.id;

    // Url
    const child = document.createElement('img');
    child.setAttribute('src', postDetails.link);
    child.setAttribute('alt', 'Posted Images');

    child.style.maxWidth = '50%';
    child.style.height = 'auto';

    // Description
    const achild = document.createElement('h4');
    achild.textContent = `User - ${postDetails.description}`

    // Comment - btn
    const schild = document.createElement('button')
    schild.setAttribute('type', 'submit');
    schild.textContent = `Comment`;

    // Event listener
    schild.addEventListener('click', () => {

        schild.style.display = 'none';

        // Comment - Input
        const commentInput = document.createElement('input');
        commentInput.setAttribute('type', 'text');
        commentInput.setAttribute('placeholder', 'Enter your comment');

        // Comment - button
        const commentBtn = document.createElement('button');
        commentBtn.setAttribute('type', 'submit');
        commentBtn.textContent = `Send`;

        // Comment - Button Event
        commentBtn.addEventListener('click', () => {

            const commentTitle = document.createElement('h6');
            commentTitle.textContent = `Anonymous -`;

            const commentValue = document.createElement('h6');
            commentValue.textContent = `${commentInput.value}`;

            parent.appendChild(commentTitle);
            parent.appendChild(commentValue);

            commentInput.value = '';

        
        })

        parent.appendChild(commentInput);
        parent.appendChild(commentBtn);

    })

    parent.appendChild(child);
    parent.appendChild(achild);
    parent.appendChild(schild);

    
}

// GET the saved User Details from crudcrud.
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await axios.get("http://localhost:3000/socialmedia/get-sm");
        for (var i = 0; i < res.data.length; i++) {
            showUser(res.data[i]);
        }
        console.log(res);
    } catch (err) {
        console.error(err);
    }
});
