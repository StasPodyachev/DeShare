import { extendTheme, ThemeConfig } from '@chakra-ui/react'
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 3. extend the theme
const theme = extendTheme({
  fonts: {
    heading: 'Source Code Pro',
    body: 'Source Code Pro',
  },
  styles: {
    global: {
      html: {
        fontSize: '14px',
      },
      body: {
        bg: '#06080f',
      },
      '::selection': {
        background: 'rgba(255,255,255,0.05)',
        color: '#fff',
      },
    },
  },
  components: {
    Breadcrumb: {
      parts: ['link'],
      baseStyle: () => {
        return {
          link: {
            fontWeight: 600,
            color: '#818E9C',
            '&[aria-current="page"]': {
              color: '#EEF0F2',
              textDecoration: 'none',
              cursor: 'text',
            },
          },
        }
      },
    },
    Table: {
      baseStyle: (props: any) => ({
        table: {
          borderCollapse: 'separate',
          borderSpacing: props?.borderSpacing ?? 0,
        },
        tr: {
          _disabled: {
            opacity: 0.4,
            cursor: 'not-allowed',
            boxShadow: 'none',
          },
        },
        th: {
          fontFamily: 'Source Code Pro',
          textAlign: 'inherit',
          textTransform: 'none',
          fontWeight: 700,
          // color: 'rgb(238 240 242 / 0.5)',
          '&[data-is-numeric=true]': {
            textAlign: 'end',
          },
        },

        td: {
          textAlign: 'inherit',
          '&[data-is-numeric=true]': {
            textAlign: 'end',
          },
        },

        tbody: {
          ...(props?.borderSpacingBody && {
            '&+tbody::before': {
              content: "''",
              display: 'table-row',
              height: props?.borderSpacingBody,
            },
          }),
        },
      }),
      sizes: {
        sm: {
          th: { py: 2, px: 4, fontSize: 'md' },
          td: { py: 2, px: 4, fontSize: 'md' },
        },
        md: {
          th: {
            px: 4,
            py: 3,
            fontSize: 'md',
          },
          td: {
            px: 4,
            py: 3,
          },
        },
      },
      variants: {
        filled: (props: any) => {
          return {
            tbody: {
              tr: {
                borderRadius: 'md',
                bg: 'rgb(238 240 242 / 6%)',
                _hover: props?.isHover && {
                  cursor: 'pointer',
                  bg: 'rgb(238 240 242 / 10%)',
                  _disabled: {
                    bg: 'initial',
                  },
                },
                _focus: props?.isHover && {
                  boxShadow: 'outline',
                  bg: 'rgb(238 240 242 / 10%)',
                  outline: 'none',
                  _disabled: {
                    bg: 'initial',
                  },
                },
              },
            },

            td: {
              '&:first-of-type': {
                borderTopLeftRadius: 'md',
                borderBottomLeftRadius: 'md',
              },
              '&:last-of-type': {
                borderTopRightRadius: 'md',
                borderBottomRightRadius: 'md',
              },
            },
          }
        },
      },
    },
    Tag: {
      baseStyle: {
        container: {
          fontWeight: 600,
        },
      },
      sizes: {
        md: {
          container: {
            py: 2,
            px: 4,
          },
        },
      },
      variants: {
        subtle: {
          container: {
            borderRadius: 'full',
          },
        },
      },
    },
    Modal: {
      parts: ['dialog'],
      baseStyle: {
        dialog: {
          bg: '#1C1924',
          borderRadius: 'xl',
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          fontWeight: 600,
        },
      },
      sizes: {
        lg: {
          field: {
            height: '48px',
          },
        },
      },
      variants: {
        filled: {
          field: {
            bg: '#2F353C',
            _focus: {
              bg: '#2F353C',
            },
          },
        },
      },
    },
    Select: {
      baseStyle: {
        field: {
          fontWeight: 600,
        },
      },
      sizes: {
        lg: {
          field: {
            height: '48px',
          },
        },
      },
      variants: {
        filled: {
          field: {
            bg: '#2F353C',
            _focus: {
              bg: '#2F353C',
            },
          },
        },
      },
    },
    Menu: {
      parts: ['list', 'item'],
      baseStyle: {
        list: {
          bg: '#2F353C',
          borderColor: '#2F353C',
        },
        item: {
          color: '#9DA6B4',
          _hover: {
            bg: '#363D45',
          },
        },
      },
    },
  },
  config,
})
export default theme
