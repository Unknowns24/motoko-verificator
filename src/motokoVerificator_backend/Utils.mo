import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

module {
    public func getPrincipalArrayElements(arr : ?[Principal]) : [Principal] {
        switch(arr) {
            case (null) return [];
            case (?existentArray) {
                return existentArray
            };
        };
    };

    public func addPrincipalToArray(arr : ?[Principal], p : Principal) : [Principal] {
        switch(arr) {
            case (null) return [p];
            case (?existentArray) {
                // Create a buffer with all the elements of the array
                var principalBuff = Buffer.Buffer<Principal>(existentArray.size());
                for (elem in existentArray.vals()) {
                    principalBuff.add(elem);
                };

                // Add the principal to the buffer
                principalBuff.add(p);

                return Buffer.toArray(principalBuff);
            };
        };
    };

    public func isPrincipalInArray(arr : ?[Principal], p : Principal) : Bool {
        let arrElements = getPrincipalArrayElements(arr);
        var searchResult : ?Principal = Array.find<Principal>(arrElements, func arrPrincipal = arrPrincipal == p);

        switch(searchResult) {
            case (null) return false;
            case (?exist) return true;
        };
    };

    public func isPrincipalInNotOptionalArray(arr : [Principal], p : Principal) : Bool {
        var searchResult : ?Principal = Array.find<Principal>(arr, func arrPrincipal = arrPrincipal == p);

        switch(searchResult) {
            case (null) return false;
            case (?exist) return true;
        };
    };

    public func hashValsToArray(arr : Iter.Iter<[Principal]>) : [[Principal]] {
        var hashValuesBuff = Buffer.Buffer<[Principal]>(0);

        for(principalArray in arr) {
            hashValuesBuff.add(principalArray)
        };

        return Buffer.toArray(hashValuesBuff);
    };
}