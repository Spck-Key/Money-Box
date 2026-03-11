-- ၁။ အသုံးပြုသူများဇယား (ပိုင်ရှင် နှင့် ကစားသူ)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(50) UNIQUE NOT NULL, -- MB-XXXX-XXXX
    name VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    balance DECIMAL(15, 2) DEFAULT 0.00,
    role ENUM('owner', 'player') DEFAULT 'player',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ၂။ ယူနစ် ဖြည့်/နှုတ် မှတ်တမ်း (ပိုင်ရှင်အတွက် အရေးကြီးသည်)
CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    target_user VARCHAR(50),
    amount DECIMAL(15, 2),
    type ENUM('add', 'withdraw'),
    status VARCHAR(20) DEFAULT 'success',
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ၃။ ဂိမ်းမှတ်တမ်းနှင့် ၁% အခွင့်ကောက်ခံမှုဇယား
CREATE TABLE game_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    player_id VARCHAR(50),
    amount DECIMAL(15, 2), -- အနိုင်/အရှုံးပမာဏ
    tax DECIMAL(15, 2),    -- ပိုင်ရှင်ရရှိသော ၁%
    game_type VARCHAR(50), -- shankone သို့မဟုတ် bugyee
    played_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ၄။ ကြော်ငြာစာတန်းများဇယား
CREATE TABLE announcements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
