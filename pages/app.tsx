const [user, setUser] = useState(null);

useEffect(() => {
  if (typeof window !== 'undefined' && window.Pi) {
    window.Pi.init({ version: "2.0", sandbox: true });
  }
}, []);

const handleBuy = async () => {
  if (!window.Pi) {
    alert("Pi SDK belum ke-load");
    return;
  }

  try {
    // 1. Login dulu wajib
    const auth = await window.Pi.authenticate(['username', 'payments'], (payment) => {
      console.log('Payment callback:', payment);
    });
    setUser(auth.user);
    
    // 2. Baru bikin payment
    const paymentData = {
      amount: 0.01,
      memo: "Mint NFT Mall Genesis #001",
      metadata: { nftId: "001" }
    };

    window.Pi.createPayment(paymentData, {
      onReadyForServerApproval: (paymentId) => {
        // Backend approve
        fetch('/api/payments/approve', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId })
        });
      },
      onReadyForServerCompletion: (paymentId, txid) => {
        // Backend complete + mint NFT
        fetch('/api/payments/complete', {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ paymentId, txid })
        });
        alert("Pembayaran sukses! NFT lu lagi di-mint 🔥");
      },
      onCancel: () => alert("Batal bayar"),
      onError: (err) => alert("Error: " + err)
    });

  } catch (err) {
    alert("Auth gagal: " + err);
  }
};

// Di JSX tombolnya:
<button onClick={handleBuy} className="...">
  Buy with Pi 0.01
</button>
