pragma solidity ^0.6.6;
pragma experimental ABIEncoderV2;


contract DigitalProperty {
    
    
    //================================================================================
    // Type declarations
    //================================================================================

    struct Property {
        uint256 id;
        string data;
        address payable owner;
        bool isForSale;
    }

    struct Transaction {
        uint256 id;
        uint256 propertyId;
        uint256 price;
        address seller;
        address buyer;
        uint date;
    }

    struct Offer {
        uint256 price;
        address payable buyer;
    }

        
    //================================================================================
    // State variables
    //================================================================================
    
    address private admin;
    uint256 private propertyCounter;
    uint256 private transactionCounter;

    //object storing
    mapping(uint256 => Property) private propertyById;
    mapping(uint256 => Transaction) private transationById;

    // user =>
    mapping(address => uint256[]) private userProperties;
    mapping(address => bytes32) private userPeselHash;

    // propertyId =>
    mapping(uint256 => uint256[]) private propertyTransactions;
    mapping(uint256 => Offer) private propertyOffer;

    //================================================================================
    // Events
    //================================================================================
   
    //================================================================================
    // Functions
    //================================================================================
    
    constructor () public {
        admin = msg.sender;
        userPeselHash[msg.sender] = "I'm user as well";
    }
    
    // Public Admin
    
    function addUser (address _address, string memory _peselHash) public onlyAdmin {
        require(userPeselHash[_address] == 0, 'Address is already registered');
        userPeselHash[_address] = stringToBytes32(_peselHash);
    }
    
    function addProperty (address payable _owner, string memory _data) public onlyAdmin {
        require(bytes(_data).length > 0, 'Data cannot be empty');
        validateIfUserIsRegistered(_owner);

        propertyCounter++;

        Property memory property = Property({
            id: propertyCounter,
            data: _data,
            owner: _owner,
            isForSale: false
        });

        propertyById[property.id] = property;
        userProperties[_owner].push(property.id);
    }

    function getUserProperties (address payable _owner) public view onlyAdmin returns (uint256[] memory, string[] memory, bool[] memory) {
        validateIfUserIsRegistered(_owner);

        uint256 total = userProperties[_owner].length;
        uint256[] memory ids = new uint256[](total);
        string[] memory data = new string[](total);
        bool[] memory isForSale = new bool[](total);
        
        for (uint256 i = 0; i < total ; i++){
            uint256 currentPropertyId = userProperties[_owner][i];
            Property memory property = propertyById[currentPropertyId];
            ids[i] = property.id;
            data[i] = property.data;
            isForSale[i] = property.isForSale;
        }
        return (ids, data, isForSale);
    }
    
    function getPropertyHistory (uint256 _propertyId) public view onlyAdmin
    returns (uint256[] memory, uint256[] memory, address[] memory, address[] memory, uint[] memory) {
        require(propertyById[_propertyId].id != 0, 'Property does not exist');

        uint256[] memory transationIds = propertyTransactions[_propertyId];
        uint256 total = transationIds.length;
        uint256[] memory ids = new uint256[](total);
        uint256[] memory prices = new uint256[](total);
        address[] memory selers = new address[](total);
        address[] memory buyers = new address[](total);
        uint[] memory dates = new uint[](total);

        for (uint256 i = 0; i < total ; i++){
            uint256 currnetId = transationIds[i];
            Transaction memory transaction = transationById[currnetId];
            ids[i] = transaction.id;
            prices[i] = transaction.price;
            selers[i] = transaction.seller;
            buyers[i] = transaction.buyer;
            dates[i] = transaction.date;
        }

        return (ids, prices, selers, buyers, dates);
    }
    
    function getTransation (uint256 _transactionId) public view onlyAdmin returns (uint256, uint256, address, address, uint) {
        require(transationById[_transactionId].id != 0, 'Transaction does not exist');

        Transaction memory transaction = transationById[_transactionId];

        return (transaction.id, transaction.price, transaction.seller, transaction.buyer, transaction.date);
    }

    //TODO
    function getLatestTransations () public view onlyAdmin returns (uint256, uint256, address, address, uint) {
    }

    // Public Users

    function createOffer (uint256 _propertyId, uint256 _price, address payable _buyer) public onlyRegisteredUsers {
        Property storage property = propertyById[_propertyId];

        require(property.owner == msg.sender, 'User is not an owner of the property');
        require(property.owner != _buyer, 'You cannot buy your own property - you dummie');
        require(property.isForSale == false, 'Offer for given property already exists');
        validateIfUserIsRegistered(_buyer);

        Offer memory offer = Offer({
            price: _price,
            buyer: _buyer
        });

        property.isForSale = true;
        propertyOffer[_propertyId] = offer;
    }

    function removeOffer (uint256 _propertyId) public onlyRegisteredUsers {
            require(propertyById[_propertyId].owner == msg.sender, 'User is not an owner of the property');

            Offer storage offer = propertyOffer[_propertyId];
            offer.price = 0;
            offer.buyer = address(0);
    }

    function confirmOffer (uint256 _propertyId) public payable onlyRegisteredUsers {
        Property storage property = propertyById[_propertyId];
        Offer storage offer = propertyOffer[_propertyId];

        require(property.isForSale == true, 'Offer for given property already exists');
        require(offer.buyer == msg.sender, 'This offer is not for you');
        require(offer.price <= msg.value, 'The amout of ether is not enough to buy this property');

        //return extra payment
        if(msg.value > offer.price) offer.buyer.transfer(msg.value - offer.price);

        //pay money to owner
        property.owner.transfer(offer.price);

        //add transaction
        transactionCounter++;
        Transaction memory transaction = Transaction({
            id: transactionCounter,
            propertyId: property.id,
            price: offer.price,
            seller: property.owner,
            buyer: offer.buyer,
            date: now
        });
        transationById[transaction.id] = transaction;
        propertyTransactions[property.id].push(transaction.id);

        //change mapping
        removeByValue(userProperties[property.owner], _propertyId);
        userProperties[offer.buyer].push(_propertyId);

        //change property data
        property.owner = offer.buyer;
        property.isForSale = false;

        //reset offer
        offer.price = 0;
        offer.buyer = address(0);
    }


    function getMyProperties () public view onlyRegisteredUsers returns (uint256[] memory, string[] memory, bool[] memory) {
        uint256 total = userProperties[msg.sender].length;
        uint256[] memory ids = new uint256[](total);
        string[] memory data = new string[](total);
        bool[] memory isForSale = new bool[](total);
        
        for (uint256 i = 0; i < total ; i++){
            uint256 currentPropertyId = userProperties[msg.sender][i];
            Property memory property = propertyById[currentPropertyId];
            ids[i] = property.id;
            data[i] = property.data;
            isForSale[i] = property.isForSale;
        }
        return (ids, data, isForSale);
    }


    // Public All

    function getProperty (uint256 _propertyId) public view returns (uint256, string memory, address, bool, uint256, address) {
        require(propertyById[_propertyId].id != 0, 'Porperty does not exists');

        Property memory property = propertyById[_propertyId];
        Offer memory offer = propertyOffer[_propertyId];

        if (msg.sender == admin || msg.sender == offer.buyer) {
            return (property.id, property.data, property.owner, property.isForSale, offer.price, offer.buyer);
        } else {
            return (property.id, property.data, property.owner, property.isForSale, 0, address(0));
        }
    }

    // Private
    
    function validateIfUserIsRegistered(address _address) internal view {
        require(_address != address(0), 'Address is invalid');
        require(userPeselHash[_address] != 0, 'Address is not registered');
    }
    
    function stringToBytes32(string memory source) internal pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
          return 0x0;
        }

         assembly {
            result := mload(add(source, 32))
        }
    }


    /** Removes the given value in an array. */
    function removeByValue(uint256[] storage values, uint256 value) internal {
        uint i = indexOf(values, value);
        removeByIndex(values, i);
    }

     /** Finds the index of a given value in an array. */
    function indexOf(uint256[] storage values, uint256 value) internal view returns(uint) {
        uint i = 0;
        while (values[i] != value) { //TODO change to for loop
            i++;
        }
        return i;
    }

    
    /** Removes the value at the given index in an array. */
    function removeByIndex(uint256[] storage array, uint256 index) internal {
       if (index >= array.length) return;

        for (uint i = index; i<array.length-1; i++){
            array[i] = array[i+1];
        }
        delete array[array.length-1];
        array.pop();
    }
  
    
    //================================================================================
    // Modifiers
    //================================================================================


    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier onlyRegisteredUsers() {
        require(msg.sender != address(0), 'Address is invalid');
        require(userPeselHash[msg.sender] != 0, 'Address is not registered');
        _;
    }


    
    //modifier registred user has addres with persl 
    
    
    
    //================================================================================
    // Debuging + Testing
    // 0xbb8054079166aa29648eBa9FfE9Ea6abD0E327E0
    // 0xcAe121927c972C40371c8F7908b4aaE4f3B5CA5A
    //================================================================================

     event LogBytes32(string, string);


     function bytes32ToStr(bytes32 _bytes32) internal pure returns (string memory) {

        // string memory str = string(_bytes32);
        // TypeError: Explicit type conversion not allowed from "bytes32" to "string storage pointer"
        // thus we should fist convert bytes32 to bytes (to dynamically-sized byte array)
    
        bytes memory bytesArray = new bytes(32);
        for (uint256 i; i < 32; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string (bytesArray);
    }
        
    //================================================================================
    // Problems
    //================================================================================
    
    //the pesel hash Im getting back is just half of the size of real one

    //decide how to store owner of propertie

    //================================================================================
    // Aditional stuff
    //================================================================================
    
    //should I provide the possiblity to deactivate account?

    //should the admin be allowed to see all transactions chronoglicly

}