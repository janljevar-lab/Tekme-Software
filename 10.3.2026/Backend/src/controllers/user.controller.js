import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;

        //basic validation

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        //check if user already exists

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //create new user
        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });
        return res.status(201).json({ 
            message: 'User created successfully',
            user: {
                 _id: user._id, 
                 email: user.email, 
                 username: user.name 
                }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}


const loginUser = async (req, res) => {
    try {

        //chek if user exists
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        //check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        res.status(200).json({
            message: 'Login successful',
            user: {
                _id: user._id,
                email: user.email,
                username: user.name
            }
        });



    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }

        
        return res.status(200).json({ message: 'Logout successful' });

    } catch (error) {
        
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    
    }
}

export {
     registerUser, 
     loginUser,
     logoutUser
    };