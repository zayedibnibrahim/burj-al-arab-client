import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);
    console.log(bookings)
    useEffect(() => {
        fetch(`http://localhost:4000/bookings?email=${loggedInUser.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data))

    }, [])
    return (
        <div>
            <div>
                <h3>You have : {bookings.length} Bookings</h3>
            </div>
            <div>
                {
                    bookings.map(booking => <li key={booking._id}>{booking.name} | From : {(new Date(booking.checkIn).toDateString('dd/mm/yyyy'))} | To: {(new Date(booking.checkOut).toDateString('dd/mm/yyyy'))}</li>)
                }
            </div>

        </div>
    );
};

export default Bookings;