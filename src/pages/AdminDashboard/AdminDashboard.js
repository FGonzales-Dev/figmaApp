import React from 'react';
import { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, collectionGroup, Timestamp, query, orderBy } from 'firebase/firestore'
import './AdminDashboard.css'
import firebase from '../../firebase';
import { compareAsc, format } from "date-fns";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import ButtonColored from '../../components/ButtonColored/ButtonColored';
function AdminDashboard() {
    const dbFirestore = firebase.firestore();
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [profile, setProfile] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [isAdmin, setIsAdmin] = useState();
    // State for handling sorting
    const [sortOrder, setSortOrder] = useState('asc');
    useEffect(() => {
        console.log("gggg went here")
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        if (user) {
            try {
                getDocs(collection(db, "user", user.uid, "profile"))
                    .then((querySnapshot) => {
                        const userProfile = querySnapshot.docs
                            .map((doc) => ({ ...doc.data(), id: doc.id }));
                        setProfile(userProfile);
                        if (userProfile[0].isAdmin == "true") {
                            fetchData()
                        } else {
                            navigate("/");
                        }
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        else {
        }
        return () => unsubscribe();
    }, [user]);


    const fetchData = async () => {
        try {
            dbFirestore.collectionGroup('url').orderBy('createdAt', 'desc').onSnapshot(function (querySnapshot) {
                var items = [];
                querySnapshot.forEach(function (doc) {
                    items.push({ key: doc.id, ...doc.data() });
                });
                console.log('first item ', items[0])
                setData(items);
            })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const showNext = ({ item }) => {
        if (data.length === 0) {
            alert("Thats all we have for now !")
        } else {
            const fetchNextData = async () => {
                await dbFirestore.collectionGroup('url')
                    .orderBy('createdAt', 'desc')
                    .limit(10)
                    .startAfter(item.createdAt)
                    .onSnapshot(function (querySnapshot) {
                        const items = [];
                        querySnapshot.forEach(function (doc) {
                            items.push({ key: doc.id, ...doc.data() });
                        });
                        setData(items);
                        setPage(page + 1)
                    })
            };
            fetchNextData();
        }
    };

    const showPrevious = ({ item }) => {
        const fetchPreviousData = async () => {
            await dbFirestore.collectionGroup('url')
                .orderBy('createdAt', 'desc')
                .endBefore(item.createdAt)
                .limitToLast(10)
                .onSnapshot(function (querySnapshot) {
                    const items = [];
                    querySnapshot.forEach(function (doc) {
                        items.push({ key: doc.id, ...doc.data() });
                    });
                    setData(items);
                    setPage(page - 1)
                })
        };
        fetchPreviousData();
    };

    return (
        <div className='folio-data-container'>


            <table className='table table-striped'>

                <thead>
                    <tr>

                        <th>Title</th>
                        <th>Generated Url</th>
                        <th>Custom Domain</th>
                        <th>Draft</th>

                        <th>Created At</th>
                        <th>Update At</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.title}</td>
                            <td>  <a href={`${item.generatedUrl}`} target="_blank" rel="noopener noreferrer">
                                {`www.figmafolio/${item.generatedUrl}`}
                            </a></td>


                            <td>{item.customDomain}</td>
                            <td>{item.isDraft}</td>
                            <td>{new Date(item?.createdAt?.seconds * 1000).toLocaleDateString("en-US")}</td>
                            <td>{new Date(item?.updatedAt?.seconds * 1000).toLocaleDateString("en-US")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* <ButtonGroup size="lg" className="mb-2">
                {
                    //show previous button only when we have items
                    page === 1 ? '' :
                        <Button onClick={() => showPrevious({ item: data[0] })}>Previous</Button>
                }

                {
                    //show next button only when we have items
                    data.length < 10 ? '' :
                        <Button onClick={() => showNext({ item: data[data.length - 1] })}>Next</Button>
                }
            </ButtonGroup> */}
        </div>
    );
}

export default AdminDashboard;







