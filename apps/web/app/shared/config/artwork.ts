import {
    MESSAGE_HIRE_CONOSLE,
    SITE_AUTHOR,
    SITE_EMAIL_ADDRESS,
    SITE_YEAR,
    SOCIAL_GITHUB,
    SOCIAL_LINKEDIN,
    SOCIAL_TWITTER,
} from "~/shared/config/constants";

/**
 * @external https://textart.io/art/tag/rocket/1
 * @description Adding a personal touch never hurt anyone right, and some
 * shameless self-promotion isn't all that bad either.
 */
const artwork = String.raw`
<!--

  ${MESSAGE_HIRE_CONOSLE}

           |
          / \\
         / _ \\         ${SITE_AUTHOR}
        |.o '.|        ${SITE_EMAIL_ADDRESS}
        |'._.'|
        |     |         - Github: ${SOCIAL_GITHUB}
      .*|  |  |*.       - LinkedIn ${SOCIAL_LINKEDIN}
     /  |  |  |  \\      - Twitter ${SOCIAL_TWITTER}
     |,-'--|--'-.|
        \\     /        Ⓒ ${SITE_YEAR}
         \\ | /
           |

-->
`;

export { artwork };
