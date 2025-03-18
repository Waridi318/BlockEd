// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract LearningApp {
    struct User {
        string name;
        uint lessonsCompleted;
        bool certified;
    }

    mapping(address => User) public users;
    address[] public learners;

    event LessonCompleted(address indexed user, uint lessonsCompleted);
    event CertificateIssued(address indexed user);

    function registerUser(string memory _name) public {
        require(bytes(users[msg.sender].name).length == 0, "User already registered");

        users[msg.sender] = User({
            name: _name,
            lessonsCompleted: 0,
            certified: false
        });

        learners.push(msg.sender);
    }

    function completeLesson() public {
        require(bytes(users[msg.sender].name).length > 0, "User not registered");

        users[msg.sender].lessonsCompleted += 1;
        emit LessonCompleted(msg.sender, users[msg.sender].lessonsCompleted);
    }

    function issueCertificate() public {
        require(users[msg.sender].lessonsCompleted >= 5, "Complete 5 lessons first");
        
        users[msg.sender].certified = true;
        emit CertificateIssued(msg.sender);
    }

    function getUser(address _user) public view returns (string memory, uint, bool) {
        return (
            users[_user].name,
            users[_user].lessonsCompleted,
            users[_user].certified
        );
    }
}