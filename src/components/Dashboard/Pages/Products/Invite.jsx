import React, { useEffect } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import Snackbar from 'node-snackbar';
import { setInvite, setInviteId } from "../../../../actions/actions";

const showMess = (message) => {
    Snackbar.show({
        actionTextColor: '#7575a3',
        text: message,
        actionText: 'ОК',
        pos: 'bottom-right'
    });
}

const Invite = ({ match }) => {
    const myHistory = useHistory();
    let codeInvite = match.params.codeInvite.split('');
    codeInvite.splice(0, 1);
    codeInvite = codeInvite.join('');
    console.log(codeInvite, 'sdsd');
    const dispatch = useDispatch();

    useEffect(() => {
        var urlencoded = new URLSearchParams();
        urlencoded.append('invite', codeInvite);
        fetch('https://secure.platinumpay.cc/v1/client/products/subscriptions/inviteSubscription', {
            method: 'POST', headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
            },
            body: urlencoded
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data.result) {
                    dispatch(setInviteId(data.response.productId));
                    dispatch(setInvite());
                    myHistory.push('/dashboard/products');
                }
                else {
                    showMess('Срок действия этой ссылки истек');
                    myHistory.push('/dashboard/products');
                }
            })
            .catch(err => {
                console.log(err);
                showMess('Ссылка недоступна');
                myHistory.push('/dashboard/products');
            })
    }, [])


    return (
        <>
            <h1>{codeInvite}</h1>
        </>
    )
};

export default withRouter(Invite);