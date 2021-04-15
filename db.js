module.exports = {
    id: 3,
    users: [{ id: 1, username: 'a', password: 'a' }, { id: 2, username: 'b', password: 'b' }],
    getUserByName: function( username )
    {
        for ( let i = 0; i < this.users.length; i++ )
        {
            const user = this.users[i];
            if ( user.username === username )
                return user;
        } // end for if
        return null;
    },
    getUserById: function( id )
    {
        for ( let i = 0; i < this.users.length; i++ )
        {
            const user = this.users[i];
            if ( user.id === id )
                return user;
        } // end for if
        return null;
    },
    addUser: function( username, password )
    {
        const user = { id: this.id++, username: username, password: password };
        this.users.push( user );
    }
};