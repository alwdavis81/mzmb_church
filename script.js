document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }


    // Dynamic Copyright Year
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* 
    ========================================
    CMS INTEGRATION (Contentful)
    ========================================
    To enable dynamic editorial updates:
    1. Sign up for Contentful (free).
    2. Create a Content Model named 'editorial' with fields:
       - title (Text)
       - date (Date)
       - body (Rich Text or Long Text)
       - author (Text)
    3. Get your Space ID and Access Token from Settings > API Keys.
    4. Uncomment the code below and fill in your keys.
    */

    /*
    const SPACE_ID = 'YOUR_SPACE_ID_HERE';
    const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN_HERE';
    const CONTENT_TYPE = 'editorial'; // The ID of your content model

    const editorialContainer = document.querySelector('.editorial-content');

    if (editorialContainer && SPACE_ID !== 'YOUR_SPACE_ID_HERE') {
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&limit=1&order=-sys.createdAt`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.items.length > 0) {
                    const post = data.items[0].fields;
                    
                    // Update DOM
                    document.getElementById('editorial-title').textContent = post.title;
                    
                    // Format Date
                    const dateObj = new Date(post.date);
                    const options = { year: 'numeric', month: 'long', day: 'numeric' };
                    document.getElementById('editorial-date').textContent = `Posted on ${dateObj.toLocaleDateString('en-US', options)}`;
                    
                    if (post.author) {
                        document.getElementById('editorial-author').textContent = `by ${post.author}`;
                    }

                    // Handle Body (Assuming simple text / markdown, for Rich Text you'd need a renderer)
                    // This creates paragraphs from newlines
                    const bodyHtml = post.body.split('\n').map(para => `<p>${para}</p>`).join('');
                    document.getElementById('editorial-body').innerHTML = bodyHtml + `
                        <div class="pastor-sig">
                            Yours in His Service,<br>
                            ${post.author || 'Rev. Dr. James Smith'}
                        </div>
                    `;
                }
            })
            .catch(error => console.error('Error fetching editorial:', error));
    }
    */
});
