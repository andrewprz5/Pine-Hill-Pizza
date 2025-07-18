const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const statusText = document.querySelector('.open-status');

    let openHour, openMinute, closeHour, closeMinute;

    // Set hours based on day
    if (day === 0) { // Sunday
        openHour = 12;
        openMinute = 0;
    } else {
        openHour = 11;
        openMinute = 0;
    }
    closeHour = 20;
    closeMinute = 30;

    // Check if current time is within open hours
    const isOpen =
        (hour > openHour || (hour === openHour && minute >= openMinute)) &&
        (hour < closeHour || (hour === closeHour && minute <= closeMinute));

    if (isOpen) {
        statusText.textContent = 'Open Now – Closes at 8:30 PM';
    } else {
        const nextOpen = day === 6 ? 'Sunday at 12:00 PM' : '11:00 AM';
        statusText.textContent = `Closed – Opens at ${nextOpen}`;
    }

    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');

    function showTestimonial(index) {
        testimonials.forEach((t, i) => {
            t.classList.toggle('active', i === index);
        });
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    setInterval(nextTestimonial, 7000);
    
    fetch('menu.json')
    .then(res => res.json())
    .then(data => {
      const categories = {
        "Specials": document.querySelector('#specials'),
        "BYO Pizza": document.querySelector('#pizza'),
        "Specialty Pizzas": document.querySelector('#specialty-pizzas'),
        "Appetizers": document.querySelector('#apps'),
        "Salads": document.querySelector('#salads'),
        "Jumbo Wings": document.querySelector('#wings'),
        "Hot Sandwiches": document.querySelector('#hot-sandwiches'),
        "Club Sandwiches": document.querySelector('#club-sandwiches'),
        "Hoagies": document.querySelector('#hoagies'),
        "Pizza Turnover": document.querySelector('#pizza-turnover'),
        "Chicken Steaks": document.querySelector('#chicken-steaks'),
        "Cheese Steaks": document.querySelector('#cheese-steaks'),
        "Burgers": document.querySelector('#burgers'),
        "Wraps": document.querySelector('#wraps'),
        "Calzones & Strombolis": document.querySelector('#calzones-strombolis'),
        "Beverages": document.querySelector('#beverages'),
      };

      data.forEach(item => {
        if (!categories[item.category]) {
          console.warn(`Category "${item.category}" not found for item:`, item);
          return;
        }

        const li = document.createElement('li');
        const labelHTML = item.bestSeller ? `<em class="best-seller">Best seller</em>` : '';
        
        li.innerHTML = `
        ${item.image ? `<img src="${item.image}" loading="lazy" alt="${item.name}" style="width: 100px; height: auto; object-fit: cover; margin-right: 10px; border-radius: 4px;">` : ''}
        <div class="menu-item-text">
          <strong>${item.name} ${labelHTML}</strong>
          ${item.description ? `<p>${item.description}</p>` : ''}
        </div>
        <span class="price">${item.price || ''}</span>
        `;
        categories[item.category].appendChild(li);

      });
    });

const form = document.querySelector("form");
const toast = document.getElementById("toast");

  form.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent default form action
    const data = new FormData(form);
    const response = await fetch(form.action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      form.reset();
      toast.innerText = "Order submitted successfully!";
      toast.classList.add("show");
      setTimeout(() => toast.classList.remove("show"), 3000);
    } else {
      toast.innerText = "Something went wrong. Please try again.";
      toast.classList.add("show", "error");
      setTimeout(() => toast.classList.remove("show", "error"), 3000);
    }
  });