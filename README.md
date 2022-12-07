# img-search
Image Search Abstraction Layer Project for FreeCodeCamp

## User stories:
1. I can get the image URLs, alt text, and page URLs for a set of images relating to a given search string.
2. I can paginate through the responses by adding the *?offset=2* parameter to the URL.
3. When I visit that shortened URL, it will redirect me to my original link.
4. I can get a list of the most recently submitted search strings.

## Example query usage:

Search for images of kittens
```text
https://img-search-rv.onrender.com/kittens
```

## Example query output:

```js
[
  {
    "url": "https://i.guim.co.uk/img/media/9972929911063f90df9d79804558dd91a168cef5/0_0_4800_4518/master/4800.jpg?w=300&q=55&auto=format&usm=12&fit=max&s=39a81b34c64692c204b43dc88d922d94",
    "snippet": "Pounce! Kittens caught mid-leap – in pictures | Life and style ...",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw1jQ03kdU08UlkAKxAuHzkXbANFjmlssHq7koOrgBM0Z5tvAhWtYKVw",
    "context": "https://www.theguardian.com/lifeandstyle/gallery/2016/nov/18/pounce-cats-caught-mid-leap-in-pictures"
    },
    {
    "url": "https://i.ytimg.com/vi/oxrWL0mUCbc/maxresdefault.jpg",
    "snippet": "Cute Kittens Doing Funny Things - Cutest Abyssian Kittens ...",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCaVLcG7bIOyeSlfcLRMbevgkKxmGQqzLRTWWZeDSZwFLRx-Rh9FC58cPA",
    "context": "https://www.youtube.com/watch?v=oxrWL0mUCbc"
    },
    {
    "url": "https://metrouk2.files.wordpress.com/2017/07/187144066.jpg?w=748&h=498&crop=1",
    "snippet": "23 cute kittens to get you through a tough week | Metro News",
    "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26kdTbntoUcXJtxBCuh6nWMw0SHHxUM7pLxXknYshniByu6sDcNZuGaE",
    "context": "http://metro.co.uk/2017/07/10/23-cute-kittens-to-get-you-through-a-tough-week-6760550/"
    },
    ...
  }
]
```
## Example query usage:

View the most recent searches
```text
https://img-search-rv.onrender.com/api/recent
```

## Example query output:

```js
[
  {
  "term": "kittens",
  "when": "2017-12-07 11:14:21 AM"
  },
  {
  "term": "puppies",
  "when": "2017-12-05 08:59:27 AM"
  },
  {
  "term": "computers",
  "when": "2017-11-29 05:33:05 PM"
  },
  ...
]
```
