<h1>Barber Blade Application README</h1>
<h2>Overview</h2>
Welcome to Barber Blade, a cutting-edge web application designed to revolutionize the way customers book haircuts. Barber Blade caters to individuals looking to effortlessly reserve timeslots for haircuts without the need for authorization. Additionally, it provides specialized functionalities for two other distinct user groups: barbers and shop owners. Barbers can manage their profiles and bookings, while owners have comprehensive control over bookings, the gallery of haircut images, the services offered, and barber management. Barber Blade is the ultimate solution for streamlining the haircut booking process, offering a seamless, user-friendly experience for customers, barbers, and shop owners alike.
<h2>Responsive Design</h2>
Barber Blade features a responsive design, ensuring a smooth and consistent user experience across various devices. From desktops to smartphones, our application adjusts to fit your screen, providing an intuitive browsing experience whether you're at home or on the go.
<h2>Preview of Barber Blade</h2>
Here are some previews of Barber Blade across different devices, demonstrating our commitment to a responsive, accessible, and engaging user interface.

<h3>PC View:</h3>

![Screenshot of Barber Blade on PC](./frontend/src/assets/barber-blade-pc-view.jpg)

<h3>Mobile View:</h3>

![Screenshot of Barber Blade on Mobile](./frontend/src/assets/barber-blade-mobile-view.jpg)
![Screenshot of Barber Blade on Mobile](./frontend/src/assets/barber-blade-mobile-view2.jpg)
![Screenshot of Barber Blade on Mobile](./frontend/src/assets/barber-blade-mobile-view3.jpg)
![Screenshot of Barber Blade on Mobile](./frontend/src/assets/barber-blade-mobile-view4.jpg)

<h2>Key Features</h2>
<h3>User Features:</h3>
<ul>
    <li>Booking System: Effortlessly book timeslots for haircuts by selecting your favorite barber without needing an account</li>
    <li>Services Browsing: Explore the various services offered by the barber shop with ease</li>
    <li>Gallery Browsing: View a wide range of haircut images</li>
</ul>
<h3>Barber Features:</h3>
<ul>
    <li>Account Management: Easy login, logout process and account management.</li>
    <li>Booking Management: Review bookings made by customers.</li>
</ul>
<h3>Owner Features:</h3>
<ul>
    <li>Comprehensive Booking Management: Oversee and manage all barber bookings from a central dashboard.</li>
    <li>Gallery Management: View, add, and delete the gallery of haircut images to showcase the shop's services.</li>
    <li>Service Management: Add, update, or remove the services offered by the barber shop.</li>
    <li>Barber Management: Manage barber profiles, including creating new barbers, with automatic assignment to 'barber' group.</li>
</ul>
<h2>Technology Stack</h2>
<h3>Front-End</h3>
<ul>
    <li>React and Bootstrap: A dynamic interface built with React and Bootstrap for responsive design.</li>
    <li> Redux: For efficient management of global state and API calls.</li>
</ul>

<h3>Back-End</h3>
<ul>
    <li>Python with Django: The back end is powered by Django, a high-level Python web framework that encourages rapid development and clean, pragmatic design.</li>
    <li>MySQL: For database management, providing a reliable and efficient system for storing and querying data.</li>
    <li>Token-Based Authentication: Secure authentication mechanism using tokens to manage user sessions.</li>
    <li>Endpoint Testing with Insomnia: To ensure the reliability and functionality of our API, Insomnia was utilized for comprehensive endpoint testing. This tool allowed us to methodically test and validate all backend communications, ensuring a seamless and bug-free user experience.</li>
</ul>

<h2>Getting Started with Barber Blade</h2>
<h3>Backend Setup</h3>
<ul>
    <li>Create a MySQL Database: Set up a MySQL database for the application.</li>
    <li>Backend Environment Variables: Pass all the environment variables to the application following the example.env file.</li>
    <li>Install Dependencies: Install all the dependencies using the command: <code>pip install -r requirements.txt</code>.</li>
    <li>Migrate Database Changes: Apply database migrations using the command: <code>python manage.py migrate</code>.</li>
    <li>Run the Development Server: Start the development server using the command: <code>python manage.py runserver</code>. OR Run the Production Server: For production, use Gunicorn to run the application. Example command: <code>gunicorn crd.wsgi:application --bind 0.0.0.0:$PORT</code>.</li>
    <li>Create a Superuser: Create a superuser for accessing the Django admin panel with the command: <code>python manage.py createsuperuser</code>.</li>
    <li>Create User Groups: In the Django admin panel, create two user groups: 'barber' and 'owner'.</li>
    <li>Create the Owner User: Create a user account for the owner and assign the 'owner' group to them through the Django admin panel. Remove them from the 'barber' group if automatically assigned.</li>
</ul>
<h3>Frontend Setup</h3>
<ul>
    <li>Frontend Environment Variables: Pass all the environment variables to the application following the example.env file.</li>
    <li>Add Gallery Images: Owners can add images to the gallery from their accounts.</li>
    <li>Add Services: Owners can add services through the UI from their accounts.</li>
    <li>Create Barbers: Owners can create barbers using the UI from their accounts.They are automatically assigned to the 'barber' group upon creation. Dates and timeslots for the whole year are created for them automatically.</li>
    <li>Add Barber Images: Barbers can add their images directly from their accounts.</li>
</ul>

Barber Blade offers a comprehensive solution for managing haircut bookings, combining ease of use for customers with powerful administrative tools for barbers and shop owners, all within a modern, responsive design framework.
