var TextDocumentTest = new TestCase("TextDocumentTest", {

   "test: find matching opening bracket" : function() {
        var doc = new ace.Document(["(()(", "())))"].join("\n"));

        assertPosition(0, 1, doc.findMatchingBracket({row: 0, column: 3}));
        assertPosition(1, 0, doc.findMatchingBracket({row: 1, column: 2}));
        assertPosition(0, 3, doc.findMatchingBracket({row: 1, column: 3}));
        assertPosition(0, 0, doc.findMatchingBracket({row: 1, column: 4}));
        assertEquals(null, doc.findMatchingBracket({row: 1, column: 5}));
    },

    "test: find matching closing bracket" : function() {
        var doc = new ace.Document(["(()(", "())))"].join("\n"));

        assertPosition(1, 1, doc.findMatchingBracket({row: 1, column: 1}));
        assertPosition(1, 1, doc.findMatchingBracket({row: 1, column: 1}));
        assertPosition(1, 2, doc.findMatchingBracket({row: 0, column: 4}));
        assertPosition(0, 2, doc.findMatchingBracket({row: 0, column: 2}));
        assertPosition(1, 3, doc.findMatchingBracket({row: 0, column: 1}));
        assertEquals(null, doc.findMatchingBracket({row: 0, column: 0}));
    },

    "test: match different bracket types" : function() {
        var doc = new ace.Document(["({[", ")]}"].join("\n"));

        assertPosition(1, 0, doc.findMatchingBracket({row: 0, column: 1}));
        assertPosition(1, 2, doc.findMatchingBracket({row: 0, column: 2}));
        assertPosition(1, 1, doc.findMatchingBracket({row: 0, column: 3}));

        assertPosition(0, 0, doc.findMatchingBracket({row: 1, column: 1}));
        assertPosition(0, 2, doc.findMatchingBracket({row: 1, column: 2}));
        assertPosition(0, 1, doc.findMatchingBracket({row: 1, column: 3}));
    },

    "test: move lines down" : function() {
        var doc = new ace.Document(["1", "2", "3", "4"].join("\n"));

        doc.moveLinesDown(0, 1);
        assertEquals(["3", "1", "2", "4"].join("\n"), doc.toString());

        doc.moveLinesDown(1, 2);
        assertEquals(["3", "4", "1", "2"].join("\n"), doc.toString());

        doc.moveLinesDown(2, 3);
        assertEquals(["3", "4", "1", "2"].join("\n"), doc.toString());

        doc.moveLinesDown(2, 2);
        assertEquals(["3", "4", "2", "1"].join("\n"), doc.toString());
    },

    "test: move lines up" : function() {
        var doc = new ace.Document(["1", "2", "3", "4"].join("\n"));

        doc.moveLinesUp(2, 3);
        assertEquals(["1", "3", "4", "2"].join("\n"), doc.toString());

        doc.moveLinesUp(1, 2);
        assertEquals(["3", "4", "1", "2"].join("\n"), doc.toString());

        doc.moveLinesUp(0, 1);
        assertEquals(["3", "4", "1", "2"].join("\n"), doc.toString());

        doc.moveLinesUp(2, 2);
        assertEquals(["3", "1", "4", "2"].join("\n"), doc.toString());
    },

    "test: duplicate lines" : function() {
        var doc = new ace.Document(["1", "2", "3", "4"].join("\n"));

        doc.duplicateLines(1, 2);
        assertEquals(["1", "2", "3", "2", "3", "4"].join("\n"), doc.toString());
    },

    "test: duplicate last line" : function() {
        var doc = new ace.Document(["1", "2", "3"].join("\n"));

        doc.duplicateLines(2, 2);
        assertEquals(["1", "2", "3", "3"].join("\n"), doc.toString());
    },

    "test: duplicate first line" : function() {
        var doc = new ace.Document(["1", "2", "3"].join("\n"));

        doc.duplicateLines(0, 0);
        assertEquals(["1", "1", "2", "3"].join("\n"), doc.toString());
    },

    "test: should handle unix style new lines" : function() {
        var doc = new ace.Document(["1", "2", "3"].join("\n"));
        assertEquals(["1", "2", "3"].join("\n"), doc.toString());
    },

    "test: should handle windows style new lines" : function() {
        var doc = new ace.Document(["1", "2", "3"].join("\r\n"));
        doc.setNewLineMode("unix");
        assertEquals(["1", "2", "3"].join("\n"), doc.toString());
    },

    "test: set new line mode to 'windows' should use '\r\n' as new lines": function() {
        var doc = new ace.Document(["1", "2", "3"].join("\n"));
        doc.setNewLineMode("windows");
        assertEquals(["1", "2", "3"].join("\r\n"), doc.toString());
    },

    "test: set new line mode to 'unix' should use '\n' as new lines": function() {
        var doc = new ace.Document(["1", "2", "3"].join("\r\n"));
        doc.setNewLineMode("unix");
        assertEquals(["1", "2", "3"].join("\n"), doc.toString());
    },

    "test: set new line mode to 'auto' should use detect the incoming nl type": function() {
        var doc = new ace.Document(["1", "2", "3"].join("\n"));
        doc.setNewLineMode("auto");
        assertEquals(["1", "2", "3"].join("\n"), doc.toString());

        var doc = new ace.Document(["1", "2", "3"].join("\r\n"));
        doc.setNewLineMode("auto");
        assertEquals(["1", "2", "3"].join("\r\n"), doc.toString());

        doc.replace({
            start: {row: 0, column: 0},
            end: {row: 2, column: 1}
        }, ["4", "5", "6"].join("\n"));
        assertEquals(["4", "5", "6"].join("\n"), doc.toString());
    }
});