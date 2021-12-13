import React from 'react';
import MonoConnect from '@mono.co/connect.js';
import { useHistory } from "react-router-dom";
import ConnectButton from '../assets/img/connect-button.png';
import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';

export default function MonoConnectWidget() {
  const history = useHistory();
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: ({ code }) => {
          AuthService.accountLink(code).then(function (response) {
            if(response.flag) {
                toast.success('Account Linked Successfully');
                setTimeout(function(){ 
                  window.location.replace('/dashboard');
                }, 5000);
            }
            else {
                if(response) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
                    toast.error(response.data.message);
                } else {
                    toast.error('Something went wrong. Try again');
                }
            }
          })
      },
      key: "live_pk_I5nOdk9IeOu3wum037g7"
    })

    monoInstance.setup()
    
    return monoInstance;
  }, []);

  return (
    <img className="img-fluid w-50 mx-auto"  style={{cursor: 'pointer'}} onClick={() => monoConnect.open()} src={ConnectButton} alt="Connect" />
  )
}