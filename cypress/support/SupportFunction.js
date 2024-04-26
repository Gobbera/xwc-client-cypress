

function formatString(type, string) {
    switch (type) {
      case 'email':
        string = string.replace(' ', '.').toLowerCase(string);
        return string;
      case 'nickname':
        return string.slice(0, 3);
        }
    }