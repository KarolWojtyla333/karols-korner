// Who Am I? Button Menu
document.querySelectorAll('.who-menu li').forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove 'active' from all buttons
      document.querySelectorAll('.who-menu li').forEach(el => el.classList.remove('active'));

      // Add 'active' to clicked button
      this.classList.add('active');

      // Get the target tab ID
      const target = this.getAttribute('data-target');

      // Hide all tabs
      document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

      // Show the selected tab
      document.getElementById(target).classList.add('active');
    });
  });

// FAQ Accordion
document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.querySelector('.faq-content');

    faqContainer.addEventListener('click', (e) => {
        const groupHeader = e.target.closest('.faq-group-header');

        if (!groupHeader) return;

        const group = groupHeader.parentElement;
        const groupBody = group.querySelector('.faq-group-body');
        const icon = groupHeader.querySelector('i');

        // Toggle icon
        icon.classList.toggle('fa-plus');
        icon.classList.toggle('fa-minus');

        // Toggle visibility of body
        groupBody.classList.toggle('open');

        // Close other open FAQ bodies
        const otherGroups = faqContainer.querySelectorAll('.faq-group');
        
        otherGroups.forEach((otherGroup) => {
            if (otherGroup !== group) {
                const otherGroupBody = otherGroup.querySelector('.faq-group-body');
                const otherIcon = otherGroup.querySelector('.faq-group-header i');

                otherGroupBody.classList.remove('open');
                otherIcon.classList.remove('fa-minus');
                otherIcon.classList.add('fa-plus');
            }
        });
    });
});


// Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    hamburgerButton.addEventListener('click', () => 
        mobileMenu.classList.toggle('active'));
});

// Contact Me Button

// $(document).ready(function() {
//     $('#bt1').click(function() {
//         $('#fr1').attr('action',
//                        'mailto:test@test.com?subject=' +
//                        $('#tb1').val() + '&body=' + $('#tb2').val());
//         $('#fr1').submit();
//     });
// });
