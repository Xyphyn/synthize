import MarkdownIt from 'markdown-it'
import markdown_it_container from 'markdown-it-container'
// @ts-ignore
import markdown_it_sub from 'markdown-it-sub'
// @ts-ignore
import markdown_it_sup from 'markdown-it-sup'

export const md = new MarkdownIt({
  html: false,
  linkify: true,
})
  .use(markdown_it_container, 'spoiler', {
    validate: (params: string) => {
      return params.trim().match(/^spoiler+(.*)/)
    },

    render: (tokens: any, idx: any) => {
      var m = tokens[idx].info.trim().match(/^spoiler+(.*)/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<details><summary> ${md.utils.escapeHtml(m[1])} </summary>\n`
      } else {
        // closing tag
        return '</details>\n'
      }
    },
  })
  .use(markdown_it_sub)
  .use(markdown_it_sup)

export const mdInline: MarkdownIt = new MarkdownIt('zero')
  .enable(['emphasis', 'backticks', 'strikethrough', 'link', 'list', 'heading'])
  .use(markdown_it_container, 'spoiler', {
    validate: (params: string) => {
      return params.trim().match(/^spoiler+(.*)/)
    },

    render: (tokens: any, idx: any) => {
      var m = tokens[idx].info.trim().match(/^spoiler+(.*)/)

      if (tokens[idx].nesting === 1) {
        // opening tag
        return `<details><summary> ${md.utils.escapeHtml(m[1])} </summary>\n`
      } else {
        // closing tag
        return '</details>\n'
      }
    },
  })
  .use(markdown_it_sub)
  .use(markdown_it_sup)

const communityLinks = {
  validate: function (text: any, pos: any, self: any) {
    var tail = text.slice(pos)

    if (!self.re.community) {
      self.re.community = new RegExp(
        /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})/i
      )
    }
    if (self.re.community.test(tail)) {
      // Linkifier allows punctuation chars before prefix,
      // but we additionally disable `@` ("@@mention" is invalid)
      if (pos >= 2 && tail[pos - 2] === '!') {
        return false
      }
      return tail.match(self.re.community)![0].length
    }
    return 0
  },
  normalize: function (match: any) {
    let prefix = match.url
    prefix = prefix.startsWith('c/') ? prefix.slice(2) : prefix.slice(1)

    match.url = `/c/${prefix}`
  },
}

const userLinks = {
  validate: function (text: any, pos: any, self: any) {
    var tail = text.slice(pos)

    if (!self.re.user) {
      self.re.user = new RegExp(/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z]{2,6})/i)
    }
    if (self.re.user.test(tail)) {
      // Linkifier allows punctuation chars before prefix,
      // but we additionally disable `@` ("@@mention" is invalid)
      if (pos >= 2 && tail[pos - 2] === '!') {
        return false
      }
      return tail.match(self.re.user)![0].length
    }
    return 0
  },
  normalize: function (match: any) {
    let prefix = match.url
    prefix = prefix.startsWith('u/') ? prefix.slice(2) : prefix.slice(1)

    match.url = `/u/${prefix}`
  },
}

md.linkify.add('!', {
  validate: communityLinks.validate,
  normalize: communityLinks.normalize,
})

md.linkify.add('c/', {
  validate: communityLinks.validate,
  normalize: communityLinks.normalize,
})

md.linkify.add('@', {
  validate: userLinks.validate,
  normalize: userLinks.normalize,
})

md.linkify.add('u/', {
  validate: userLinks.validate,
  normalize: userLinks.normalize,
})

const regexes = {
  post: /^https:\/\/([a-zA-Z0-9.-]+)\/post\/(\d+)$/i,
  comment: /^https:\/\/([a-zA-Z0-9.-]+)\/comment\/(\d+)$/i,
  user: /^https:\/\/([a-zA-Z0-9.-]+)(\/u\/)([a-zA-Z0-9.-_]+)$/i,
  community: /^https:\/\/([a-zA-Z0-9.-]+)(\/c\/)([a-zA-Z0-9.-_]+)$/i,
}

/**
 * Convert links to photon links
 */
export const photonify = (link: string) => {
  if (regexes.post.test(link)) {
    const match = link.match(regexes.post)
    if (!match) return
    return `/post/${match?.[1]}/${match?.[2]}`
  }
  if (regexes.comment.test(link)) {
    const match = link.match(regexes.comment)
    if (!match) return
    return `/comment/${match?.[1]}/${match?.[2]}`
  }
  if (regexes.user.test(link)) {
    const match = link.match(regexes.user)
    if (!match) return
    return `/u/${match?.[3]}@${match?.[1]}`
  }
  if (regexes.community.test(link)) {
    const match = link.match(regexes.community)
    if (!match) return
    return `/c/${match?.[3]}@${match?.[1]}`
  }
}
