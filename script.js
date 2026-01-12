// 1. SELECT THE ELEMENTS
const form = document.getElementById('signup-form');
const emailInput = document.getElementById('email');
const feedbackMsg = document.getElementById('feedback-msg');

// 2. LISTEN FOR THE SUBMIT EVENT
form.addEventListener('submit', function(event) {
    
    // 3. STOP THE PAGE RELOAD
    event.preventDefault();

    // 4. GET THE VALUE
    const userEmail = emailInput.value;

    // 5. VALIDATION (Check if email has @)
    if (userEmail.includes('@')) {
        
        // Show "Sending..." status
        feedbackMsg.style.color = 'orange';
        feedbackMsg.textContent = "Sending data to server...";

        // 6. SEND DATA (The Fetch API)
        // We send the email to a fake testing server
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: userEmail }) 
        })
        .then(response => response.json()) // Convert server reply to JSON
        .then(data => {
            // SUCCESS!
            console.log('Success:', data);
            feedbackMsg.style.color = 'lightgreen';
            feedbackMsg.textContent = `Success! Server accepted: ${userEmail} (ID: ${data.id})`;
            
            // Clear the input box
            emailInput.value = '';
        })
        .catch((error) => {
            // ERROR!
            console.error('Error:', error);
            feedbackMsg.style.color = 'red';
            feedbackMsg.textContent = "Server error. Please try again.";
        });

    } else {
        // VALIDATION FAILED
        feedbackMsg.style.color = 'red';
        feedbackMsg.textContent = 'Please enter a valid email address.';
    }
});