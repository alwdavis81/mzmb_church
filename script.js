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
    const CONTENT_TYPE = 'editorial'; 

    const editorialContainer = document.querySelector('.editorial-content');

    // Async function handles the "waiting" automatically without freezing the page
    async function loadEditorial() {
        if (!editorialContainer || SPACE_ID === 'YOUR_SPACE_ID_HERE') return;
        
        // SELECT ELEMENTS
        const loader = document.getElementById('editorial-loader');
        const contentWrapper = document.getElementById('editorial-content-wrapper');

        // 1. SHOW LOADING STATE
        // We hide the "Welcome" message and show the spinner while we check for updates
        if (loader && contentWrapper) {
            loader.style.display = 'block';
            contentWrapper.style.opacity = '0.5'; // Dim the old content slightly
            contentWrapper.setAttribute('aria-busy', 'true'); // Tell screen readers we are working
        }

        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master/entries?access_token=${ACCESS_TOKEN}&content_type=${CONTENT_TYPE}&limit=1&order=-sys.createdAt`;

        try {
            // 'await' waits for the data to arrive
            const response = await fetch(url);
            const data = await response.json();

            if (data.items.length > 0) {
                const post = data.items[0].fields;
                
                // Content arrived! Now we update the HTML (swapping the placeholder)
                document.getElementById('editorial-title').textContent = post.title;
                
                const dateObj = new Date(post.date);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                document.getElementById('editorial-date').textContent = `Posted on ${dateObj.toLocaleDateString('en-US', options)}`;
                
                if (post.author) {
                    document.getElementById('editorial-author').textContent = `by ${post.author}`;
                }

                const bodyHtml = post.body.split('\n').map(para => `<p>${para}</p>`).join('');
                document.getElementById('editorial-body').innerHTML = bodyHtml + `
                    <div class="pastor-sig">
                        Yours in His Service,<br>
                        ${post.author || 'Rev. Dr. James Smith'}
                    </div>
                `;
            }
        } catch (error) {
            // If fetching fails, we keep the default "Welcome" message
            console.error('Error fetching editorial:', error);
        } finally {
            // 2. REMOVE LOADING STATE
            // Whether it succeeded or failed, turn off the spinner and bring back the content
            if (loader && contentWrapper) {
                loader.style.display = 'none';
                contentWrapper.style.opacity = '1';
                contentWrapper.setAttribute('aria-busy', 'false'); // Work is done
            }
        }
    }

    // Call the function
    loadEditorial();
    */
});
