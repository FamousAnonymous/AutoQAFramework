window.addEventListener(
    'load',
    function () {
        FastClick.attach(document.body)
    },
    false
)
;(() => {
    var config = {
        users: {
            url: 'users?page=2',
            type: 'get',
            data: null,
            status: 200,
            response: {
                page: 2,
                per_page: 6,
                total: 12,
                total_pages: 2,
                data: [
                    {
                        id: 7,
                        email: 'michael.lawson@reqres.in',
                        first_name: 'Michael',
                        last_name: 'Lawson',
                        avatar: 'https://reqres.in/img/faces/7-image.jpg',
                    },
                ],
                support: {
                    url: 'https://reqres.in/#support-heading',
                    text: 'To keep ReqRes free, contributions are appreciated!',
                },
            },
        },
        'users-single': {
            url: 'users/2',
            type: 'get',
            data: null,
            status: 200,
            response: {
                data: {
                    id: 2,
                    email: 'janet.weaver@reqres.in',
                    first_name: 'Janet',
                    last_name: 'Weaver',
                    avatar: 'https://reqres.in/img/faces/2-image.jpg',
                },
                support: {
                    url: 'https://reqres.in/#support-heading',
                    text: 'To keep ReqRes free, contributions are appreciated!',
                },
            },
        },
        'users-single-not-found': {
            url: 'users/23',
            type: 'get',
            data: null,
            status: 404,
            response: {},
        },
        unknown: {
            url: 'unknown',
            type: 'get',
            data: null,
            status: 200,
            response: {
                page: 1,
                per_page: 6,
                total: 12,
                total_pages: 2,
                data: [
                    {
                        id: 1,
                        name: 'cerulean',
                        year: 2000,
                        color: '#98B2D1',
                        pantone_value: '15-4020',
                    },
                ],
            },
        },
        'unknown-single': {
            url: 'unknown/2',
            type: 'get',
            data: null,
            status: 200,
            response: {
                data: {
                    id: 2,
                    name: 'fuchsia rose',
                    year: 2001,
                    color: '#C74375',
                    pantone_value: '17-2031',
                },
            },
        },
        'unknown-single-not-found': {
            url: 'unknown/23',
            type: 'get',
            data: null,
            status: 404,
            response: {},
        },
        post: {
            url: 'users',
            type: 'post',
            status: 201,
            data: {
                name: 'morpheus',
                job: 'leader',
            },
            response: {
                name: 'morpheus',
                job: 'leader',
                id: '496',
                createdAt: '2024-07-01T10:00:00.000Z',
            },
        },
        put: {
            url: 'users/2',
            type: 'put',
            status: 200,
            data: {
                name: 'morpheus',
                job: 'zion resident',
            },
            response: {
                name: 'morpheus',
                job: 'zion resident',
                updatedAt: '2024-07-01T10:00:00.000Z',
            },
        },
        patch: {
            url: 'users/2',
            type: 'patch',
            status: 200,
            data: {
                name: 'morpheus',
                job: 'zion resident',
            },
            response: {
                name: 'morpheus',
                job: 'zion resident',
                updatedAt: '2024-07-01T10:00:00.000Z',
            },
        },
        delete: {
            url: 'users/2',
            type: 'delete',
            data: null,
            status: 204,
            response: null,
        },
        'register-successful': {
            url: 'register',
            type: 'post',
            status: 200,
            data: {
                email: 'eve.holt@reqres.in',
                password: 'pistol',
            },
            response: { id: 4, token: 'QpwL5tke4Pnpja7X4' },
        },
        'register-unsuccessful': {
            url: 'register',
            type: 'post',
            status: 400,
            data: {
                email: 'sydney@fife',
            },
            response: { error: 'Missing password' },
        },
        'login-successful': {
            url: 'login',
            type: 'post',
            status: 200,
            data: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka',
            },
            response: { token: 'QpwL5tke4Pnpja7X4' },
        },
        'login-unsuccessful': {
            url: 'login',
            type: 'post',
            status: 400,
            data: {
                email: 'peter@klaven',
            },
            response: { error: 'Missing password' },
        },
        delay: {
            url: 'users?delay=3',
            type: 'get',
            data: null,
            status: 200,
            response: {
                data: [
                    {
                        id: 1,
                        email: 'george.bluth@reqres.in',
                        first_name: 'George',
                        last_name: 'Bluth',
                        avatar: 'https://reqres.in/img/faces/1-image.jpg',
                    },
                ],
            },
            fakeDelayMs: 1400,
        },
    }

    if (!String.linkify) {
        String.prototype.linkify = function () {
            // http://, https://, ftp://
            var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim

            // www. sans http:// or https://
            var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim

            // Email addresses
            var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim

            return this.replace(urlPattern, '<a href=$&>$&</a>')
                .replace(pseudoUrlPattern, '$1<a href=http://$2>$2</a>')
                .replace(emailAddressPattern, '<a href="mailto:$&">$&</a>')
        }
    }

    var consoleEl = document.querySelector('#console')

    if (!consoleEl) {
        return
    }

    var endpointsEl = consoleEl.querySelector("[data-key='endpoints']")

    var endpointEls = endpointsEl.querySelectorAll("[data-key='endpoint']")

    var urlEl = consoleEl.querySelector("[data-key='url']")

    var requestOutputLinkEl = consoleEl.querySelector(
        "[data-key='request-output-link']"
    )

    var responseCodeEl = consoleEl.querySelector("[data-key='response-code']")

    var sendRequestButton = consoleEl.querySelector("[data-key='send-request']")

    var outputRequestEl = consoleEl.querySelector("[data-key='output-request']")

    var outputResponseEl = consoleEl.querySelector(
        "[data-key='output-response']"
    )

    var spinnerEl = consoleEl.querySelector("[data-key='spinner']")
    var rateHintEl = consoleEl.querySelector("[data-key='rate-hint']")

    var timerID = null
    var inFlight = false
    var lastRequestAt = 0
    var responseCache = new Map()
    var MIN_INTERVAL_MS = 800
    var CACHE_TTL_MS = 8000

    ;[].forEach.call(endpointEls, function (element) {
        var key = element.getAttribute('data-id')
        var linkEl = element.querySelector("[data-key='try-link']")
        var finalURL = '/api/' + config[key].url

        linkEl.href = finalURL
    })
    function setButtonsDisabled(disabled) {
        ;[].forEach.call(endpointEls, function (btn) {
            btn.classList.toggle('opacity-50', disabled)
            btn.classList.toggle('pointer-events-none', disabled)
            btn.setAttribute('aria-disabled', disabled ? 'true' : 'false')
        })
    }

    function showHint(content, tone) {
        if (!rateHintEl) return
        rateHintEl.textContent = content
        rateHintEl.classList.toggle('hidden', false)
        rateHintEl.classList.toggle('border-rose-300/30', tone === 'error')
        rateHintEl.classList.toggle('bg-rose-500/10', tone === 'error')
        rateHintEl.classList.toggle('text-rose-100', tone === 'error')
    }

    function clearHint() {
        if (!rateHintEl) return
        rateHintEl.classList.add('hidden')
        rateHintEl.textContent = ''
        rateHintEl.classList.remove(
            'border-rose-300/30',
            'bg-rose-500/10',
            'text-rose-100'
        )
    }

    function renderResponse(status, resp, fromCache) {
        responseCodeEl.innerHTML = status
        responseCodeEl.classList.remove('bad')
        if (status >= 300) {
            responseCodeEl.classList.add('bad')
        }

        if (resp) {
            if (resp.ad) {
                resp.ad.url = resp.ad.url.linkify()
            }
            if (resp.support) {
                resp.support.url = resp.support.url.linkify()
            }
            outputResponseEl.innerHTML = syntaxHighlight(
                JSON.stringify(resp, undefined, 4)
            )
        } else {
            outputResponseEl.innerHTML = ''
        }

        spinnerEl.setAttribute('hidden', true)
        outputResponseEl.removeAttribute('hidden')

        if (fromCache) {
            showHint(
                'Using a cached response to avoid hammering the legacy demo. For higher limits, create a project.',
                'warn'
            )
        }
    }

    function showRateLimitedMessage() {
        const retryAfter = Math.ceil(MIN_INTERVAL_MS / 1000)
        responseCodeEl.innerHTML = 429
        responseCodeEl.classList.add('bad')
        outputResponseEl.innerHTML = syntaxHighlight(
            JSON.stringify(
                {
                    error: 'rate_limited',
                    message:
                        'Rate limited to keep the legacy API usable for everyone. Try again in a few seconds or use Projects for higher limits.',
                    retry_after_seconds: retryAfter,
                    upgrade: 'https://app.reqres.in/projects',
                },
                undefined,
                4
            )
        )
        spinnerEl.setAttribute('hidden', true)
        outputResponseEl.removeAttribute('hidden')
        showHint(
            'We paused requests for a moment. Open Projects in the app for higher, bursty limits.',
            'error'
        )
    }

    ;[].forEach.call(endpointEls, function (el) {
        el.addEventListener('click', function (e) {
            e.preventDefault()

            var now = Date.now()
            if (inFlight) {
                showRateLimitedMessage()
                return
            }
            if (now - lastRequestAt < MIN_INTERVAL_MS) {
                showRateLimitedMessage()
                return
            }

            var element = e.currentTarget
            var key = element.getAttribute('data-id')
            var settings = config[key]
            var cacheKey = settings.url + JSON.stringify(settings.data || {})

            if (window.reqresAnalytics && window.reqresAnalytics.legacyConsoleUsed) {
                window.reqresAnalytics.legacyConsoleUsed({
                    endpoint: settings.url,
                    method: (settings.type || 'get').toUpperCase(),
                    has_api_key: !!localStorage.getItem('reqres_api_key'),
                })
            }

            for (var i = endpointEls.length - 1; i >= 0; i--) {
                var ep = endpointEls[i]
                ep.classList.remove('active')
            }
            element.classList.add('active')

            clearHint()
            outputRequestEl.setAttribute('hidden', true)
            if (settings.data) {
                outputRequestEl.innerHTML = syntaxHighlight(
                    JSON.stringify(settings.data, undefined, 4)
                )
                outputRequestEl.removeAttribute('hidden')
            }

            var finalURL = '/api/' + settings.url
            urlEl.innerHTML = finalURL
            requestOutputLinkEl.href = finalURL

            outputResponseEl.innerHTML = ''
            outputResponseEl.setAttribute('hidden', true)
            spinnerEl.removeAttribute('hidden')

            // Serve cached response to avoid hammering the API demo
            var cached = responseCache.get(cacheKey)
            if (cached && now - cached.ts < CACHE_TTL_MS) {
                renderResponse(cached.status, cached.body, true)
                return
            }

            inFlight = true
            setButtonsDisabled(true)
            lastRequestAt = now

            var fakeDelay =
                settings.fakeDelayMs ||
                Math.floor(280 + Math.random() * 420) // feel realistic but fast

            setTimeout(function () {
                var status = settings.status || 200
                var resp =
                    settings.response === null
                        ? null
                        : settings.response || { message: 'OK' }

                renderResponse(status, resp, false)
                responseCache.set(cacheKey, {
                    status: status,
                    body: resp,
                    ts: Date.now(),
                })

                inFlight = false
                setButtonsDisabled(false)
            }, fakeDelay)
        })
    })

    endpointEls[0].click()

    function syntaxHighlight(json) {
        json = json
            .replace(/&/g, '&')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
        return json.replace(
            /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
            function (match) {
                var cls = 'number'
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key'
                    } else {
                        cls = 'string'
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean'
                } else if (/null/.test(match)) {
                    cls = 'null'
                }
                return '<span class="' + cls + '">' + match + '</span>'
            }
        )
    }

    const triggerProBtn = document.querySelector('#trigger-pro')
    const proForm = document.querySelector('#pro-form')
    triggerProBtn &&
        triggerProBtn.addEventListener('click', function () {
            this.style.display = 'none'
            proForm.style.display = 'block'
        })

    // Stripe PUBLISHABLE keys - intentionally client-side. These are public
    // by design (Stripe docs: "publishable keys can be safely published in
    // your frontend code"). They can only create tokens, not read data or
    // charge cards. The secret key is in env vars, never in client code.
    const stripe = Stripe(
        window.location.href.includes('reqres')
            ? 'pk_live_51HmoV1FwjyisBAsvak7NTtXQDxsnzYMztc06N3yjc7JV5IhCH8f1AJx37mBe8sHzrSgCk80XEUTAxd8YgDBkSfq600oQlSghNC'
            : 'pk_test_51HmoV1FwjyisBAsveD2pyg2NknxuB3ubwgQN3O0ZMHF64XsnCz8qGFV1RxYgWk7FYIhSovSPvTKykbxlxmKVZW4900puTPyc5m'
    )
    document.querySelector('#upgrade-btn')?.addEventListener('click', () => {
        fetch('/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        })
            .then((res) => res.json())
            .then((session) => {
                return stripe.redirectToCheckout({ sessionId: session.id })
            })
            .catch((err) => alert('Error starting checkout'))
    })
    const supportForm = document.querySelector('#supportForm')
    supportForm &&
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault()
            document.querySelector('#supportForm button').innerHTML =
                'Loading...'
            const data = new FormData(supportForm)
            let option
            let amount
            for (const [name, value] of data) {
                option = value === 'supportRecurring'
                if (
                    name === 'oneTimeAmount' &&
                    value &&
                    parseInt(value.toString(), 10) > 0
                ) {
                    amount = parseInt(value.toString(), 10)
                }
            }
            fetch('/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recurring: !!option,
                    amount,
                }),
            })
                .then(function (response) {
                    return response.json()
                })
                .then(function (session) {
                    return stripe.redirectToCheckout({ sessionId: session.id })
                })
                .then(function (result) {
                    // If `redirectToCheckout` fails due to a browser or network
                    // error, you should display the localized error message to your
                    // customer using `error.message`.
                    if (result.error) {
                        alert(result.error.message)
                    }
                })
                .catch(function (error) {
                    console.error('Error:', error)
                })
        })
})()

// Marketing landing helpers (migrated from inline scripts in index.html)
;(function initMarketingAnalytics() {
    if (typeof window === 'undefined') return

    const config = window.__REQRES_POSTHOG__
    const debug =
        (function () {
            try {
                return localStorage.getItem('rr_ph_debug') === 'true'
            } catch (e) {
                return false
            }
        })() || false

    if (config && config.key) {
        if (!window.posthog || !window.posthog.capture) {
            ;(function (t, e) {
                if (e.__SV) return
                e.__SV = 1
                window.posthog = e
                e._i = []
                e.init = function (i, s, a) {
                    function g(t, e) {
                        const o = e.split('.')
                        if (o.length === 2) {
                            t = t[o[0]]
                            e = o[1]
                        }
                        t[e] = function () {
                            t.push([e].concat([].slice.call(arguments, 0)))
                        }
                    }
                    const p = t.createElement('script')
                    p.type = 'text/javascript'
                    p.async = true
                    p.src = (s.api_host || 'https://eu.i.posthog.com') + '/static/array.js'
                    const r = t.getElementsByTagName('script')[0]
                    r.parentNode.insertBefore(p, r)
                    let u = e
                    if (a !== undefined) {
                        u = e[a] = []
                    } else {
                        a = 'posthog'
                    }
                    u.people = u.people || []
                    u.toString = function (t) {
                        let e = 'posthog'
                        if (a !== 'posthog') {
                            e += '.' + a
                        }
                        if (!t) {
                            e += ' (stub)'
                        }
                        return e
                    }
                    u.people.toString = function () {
                        return u.toString(1) + '.people (stub)'
                    }
                    const o =
                        'capture identify alias group register reset isFeatureEnabled'.split(
                            ' '
                        )
                    for (let n = 0; n < o.length; n++) {
                        g(u, o[n])
                    }
                    e._i.push([i, s, a])
                }
            })(document, window.posthog || [])
            window.posthog.init(config.key, {
                api_host: config.host || 'https://eu.i.posthog.com',
                // Pageviews ON (Workstream G): the /sponsor media kit needs
                // honest monthly-uniques + top-pages, and the old "GA4 covers
                // pageviews" assumption was false — the GA tag is dead
                // Universal Analytics. This starts the measurement warm-up.
                capture_pageview: true,
                // Cost controls — still suppress the high-volume, low-signal
                // captures ($autocapture ~3.5K/day, $web_vitals ~6.4K/day,
                // session recordings). Pageviews alone are cheap and are the
                // one signal the media kit actually needs.
                autocapture: false,
                web_vitals: false,
                disable_session_recording: true,
                persistence: 'cookie',
                cross_subdomain_cookie: true,
                cookie_domain: '.reqres.in',
            })
            if (debug && window.posthog.debug) {
                window.posthog.debug()
            }
        }
    } else if (debug) {
        console.info('[marketing analytics] PostHog key missing')
    }

    const UTM_KEYS = [
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
    ]
    const UTM_STORAGE_KEY = 'rr_utm'
    const UTM_TS_KEY = 'rr_utm_ts'
    const UTM_TTL_MS = 1000 * 60 * 60 * 24 * 30

    const getUtmFromSearch = function () {
        const params = new URLSearchParams(window.location.search)
        const data = {}
        let found = false
        UTM_KEYS.forEach((key) => {
            const value = params.get(key)
            if (value) {
                data[key] = value
                found = true
            }
        })
        return found ? data : null
    }

    const storeUtm = function (data) {
        try {
            localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(data))
            localStorage.setItem(UTM_TS_KEY, String(Date.now()))
        } catch (e) {}
    }

    const readStoredUtm = function () {
        try {
            const stored = localStorage.getItem(UTM_STORAGE_KEY)
            const tsRaw = localStorage.getItem(UTM_TS_KEY)
            if (!stored || !tsRaw) return null
            const ts = Number(tsRaw)
            if (!Number.isFinite(ts) || Date.now() - ts > UTM_TTL_MS) {
                localStorage.removeItem(UTM_STORAGE_KEY)
                localStorage.removeItem(UTM_TS_KEY)
                return null
            }
            const parsed = JSON.parse(stored)
            return parsed && typeof parsed === 'object' ? parsed : null
        } catch (e) {
            return null
        }
    }

    const getUtm = function () {
        const fresh = getUtmFromSearch()
        if (fresh) {
            storeUtm(fresh)
            return fresh
        }
        return readStoredUtm() || {}
    }

    const sanitizePath = function () {
        return window.location.pathname || '/'
    }

    const getReferrerDomain = function () {
        if (!document.referrer) return null
        try {
            return new URL(document.referrer).hostname || null
        } catch (e) {
            return null
        }
    }

    const capture = function (event, props) {
        try {
            if (window.posthog && window.posthog.capture) {
                window.posthog.capture(event, props || {})
            } else if (debug) {
                console.info('[marketing analytics] capture skipped', event, props)
            }
        } catch (e) {}
    }

    const getDistinctId = function () {
        try {
            if (window.posthog && typeof window.posthog.get_distinct_id === 'function') {
                return window.posthog.get_distinct_id()
            }
        } catch (e) {}
        return null
    }

    const decorateAppLinks = function (utm, distinctId) {
        if ((!utm || !Object.keys(utm).length) && !distinctId) return
        const links = document.querySelectorAll('a[href*="app.reqres.in"]')
        links.forEach(function (link) {
            try {
                const url = new URL(link.href)
                UTM_KEYS.forEach((key) => {
                    if (utm[key] && !url.searchParams.has(key)) {
                        url.searchParams.set(key, utm[key])
                    }
                })
                if (distinctId && !url.searchParams.has('ph_distinct_id')) {
                    url.searchParams.set('ph_distinct_id', distinctId)
                }
                link.href = url.toString()
            } catch (e) {}
        })
    }

    const reqresAnalytics = {
        // No-op: GA4 covers marketing-site pageviews. We were capturing ~2.7K/day
        // page_view events in PostHog with zero downstream consumer (no funnels
        // or dashboards reference it). Kept as a stub so existing call sites
        // (window.reqresTrack('page_view'), the auto-fire on page load) don't
        // throw — they just become no-ops.
        pageView: function () {},
        ctaClick: function (payload) {
            const utm = getUtm()
            capture('cta_clicked', {
                cta_id: payload.cta_id,
                cta_label: payload.cta_label,
                location: payload.location || 'unknown',
                path: sanitizePath(),
                ...utm,
            })
        },
        legacyConsoleUsed: function (payload) {
            const utm = getUtm()
            capture('legacy_console_used', {
                endpoint: payload.endpoint,
                method: payload.method,
                has_api_key: !!payload.has_api_key,
                path: sanitizePath(),
                ...utm,
            })
        },
    }

    window.reqresAnalytics = reqresAnalytics
    if (!window.__rrTrackTest) {
        window.__rrTrackTest = function () {
            reqresAnalytics.ctaClick({
                cta_id: 'rr_track_test',
                cta_label: 'RR Track Test',
                location: 'marketing',
            })
        }
    }
    window.reqresTrack = function (event, properties) {
        if (event === 'page_view') {
            reqresAnalytics.pageView()
            return
        }
        if (event === 'cta_clicked') {
            reqresAnalytics.ctaClick(properties || {})
            return
        }
        if (event === 'legacy_console_used') {
            reqresAnalytics.legacyConsoleUsed(properties || {})
            return
        }
        const label =
            (properties && (properties.label || properties.cta_label)) ||
            (typeof event === 'string' ? event : 'cta')
        reqresAnalytics.ctaClick({
            cta_id: typeof event === 'string' ? event : 'cta',
            cta_label: label,
            location: properties && properties.location,
        })
    }

    const utm = getUtm()
    const distinctId = getDistinctId()
    decorateAppLinks(utm, distinctId)
    setTimeout(function () {
        decorateAppLinks(utm, getDistinctId())
    }, 500)
    reqresAnalytics.pageView()
})()

window.reqresOpenDemo = function () {
    const el = document.getElementById('demo-lightbox')
    if (el) el.classList.remove('hidden')
}

window.reqresCloseDemo = function () {
    const el = document.getElementById('demo-lightbox')
    if (el) el.classList.add('hidden')
}

window.reqresSetTab = function (which) {
    const uploadPanel = document.getElementById('panel-upload')
    const figmaPanel = document.getElementById('panel-figma')
    const uploadTab = document.getElementById('tab-upload')
    const figmaTab = document.getElementById('tab-figma')
    if (uploadPanel && figmaPanel && uploadTab && figmaTab) {
        uploadPanel.classList.toggle('hidden', which !== 'upload')
        figmaPanel.classList.toggle('hidden', which !== 'figma')
        uploadTab.classList.toggle('bg-white/10', which === 'upload')
        figmaTab.classList.toggle('bg-white/10', which === 'figma')
    }
    window.reqresTrack('micro_demo_started', { variant: which })
}

window.reqresGenerateDemo = function () {
    const results = document.getElementById('demo-results')
    if (results) results.classList.remove('hidden')
    window.reqresTrack('micro_demo_generated', {})
}

function showMonthlyPricing() {
    document
        .querySelectorAll('.price-monthly')
        .forEach((el) => (el.style.display = 'inline'))
    document
        .querySelectorAll('.price-annual')
        .forEach((el) => (el.style.display = 'none'))
    document
        .querySelectorAll('.original-price-annual')
        .forEach((el) => (el.style.display = 'none'))
    document.querySelectorAll('.period').forEach((el) => {
        el.textContent = '/month'
    })
}

function showAnnualPricing() {
    document
        .querySelectorAll('.price-monthly')
        .forEach((el) => (el.style.display = 'none'))
    document
        .querySelectorAll('.price-annual')
        .forEach((el) => (el.style.display = 'inline'))
    document
        .querySelectorAll('.original-price-annual')
        .forEach((el) => (el.style.display = 'inline'))
    document.querySelectorAll('.period').forEach((el) => {
        el.textContent = '/year'
    })
}

window.toggleBilling = function () {
    const toggleSwitch = document.querySelector('.toggle-switch')
    if (!toggleSwitch) return
    const isAnnual = toggleSwitch.classList.contains('annual')
    if (isAnnual) {
        toggleSwitch.classList.remove('annual')
        showMonthlyPricing()
    } else {
        toggleSwitch.classList.add('annual')
        showAnnualPricing()
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initialize pricing state
    try {
        showMonthlyPricing()
    } catch (e) {}

    // Reveal sticky bar after scroll
    const bar = document.getElementById('sticky-cta')
    if (bar) {
        document.addEventListener('scroll', () => {
            if (window.scrollY > 600) bar.classList.remove('hidden')
        })
    }

    // Intersection observer for demo animations
    try {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationPlayState = 'running'
                    }
                })
            },
            { threshold: 0.1 }
        )
        document
            .querySelectorAll('.demo-title, .demo-card, .demo-cta-button')
            .forEach((el) => observer.observe(el))
    } catch (e) {}

    // Animated SVG fallback for broken images
    try {
        const toDataUrl = (svg) =>
            'data:image/svg+xml;utf8,' +
            encodeURIComponent(svg.replace(/\n|\r/g, ''))

        const buildSVG = (w, h, label) => {
            const width = Math.max(200, Math.min(1600, w || 600))
            const height = Math.max(120, Math.min(1200, h || 360))
            const text = (label || 'ReqRes Image').slice(0, 48)
            return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6">
        <animate attributeName="offset" values="0;1;0" dur="6s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" stop-color="#f472b6">
        <animate attributeName="offset" values="1;0;1" dur="6s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    <linearGradient id="shine" x1="-100%" y1="0" x2="200%" y2="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="50%" stop-color="rgba(255,255,255,0.25)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="#0b0b10"/>
  <rect x="1" y="1" width="${width - 2}" height="${
                height - 2
            }" rx="16" ry="16" fill="url(#grad)" opacity="0.12"/>
  <g>
    <rect x="0" y="0" width="100%" height="100%" fill="url(#shine)">
      <animate attributeName="x" values="-${width};${width}" dur="3.2s" repeatCount="indefinite"/>
    </rect>
  </g>
  <g font-family="SF Pro Display, Inter, system-ui, -apple-system, Arial" text-anchor="middle">
    <text x="50%" y="50%" dy="8" font-size="${Math.round(
        Math.min(28, Math.max(16, width * 0.05))
    )}" fill="#e7e8ea" opacity="0.9">${text}</text>
    <text x="50%" y="${
        height - 18
    }" font-size="12" fill="#c084fc" opacity="0.9">placeholder</text>
  </g>
  <circle cx="${width - 28}" cy="28" r="4" fill="#8b5cf6">
    <animate attributeName="r" values="4;8;4" dur="2.2s" repeatCount="indefinite"/>
  </circle>
  <circle cx="28" cy="${height - 28}" r="3" fill="#f472b6">
    <animate attributeName="r" values="3;7;3" dur="2.6s" repeatCount="indefinite"/>
  </circle>
</svg>`
        }

        const applyFallback = (img) => {
            if (img?.dataset?.fallbackApplied === '1') return
            const w = img.naturalWidth || img.width || 600
            const h = img.naturalHeight || img.height || 360
            const label = img.alt || img.getAttribute('data-label') || 'ReqRes'
            img.src = toDataUrl(buildSVG(w, h, label))
            img.dataset.fallbackApplied = '1'
            img.classList.add('img-fallback')
        }

        document.querySelectorAll('img').forEach((img) => {
            img.addEventListener('error', () => applyFallback(img), {
                once: true,
            })
            // If src is intentionally empty or already 404, force fallback immediately
            if (!img.getAttribute('src')) applyFallback(img)
        })
    } catch (e) {}

    ;(function initChapterTracer() {
        const stack = document.getElementById('rr-chapter-stack')
        const dot = document.getElementById('rrTracerDot')
        if (!stack || !dot) return

        const cards = Array.from(stack.querySelectorAll('.rr-chapter-card'))
        if (!cards.length) return

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        )

        const setDotTo = (el) => {
            const stackRect = stack.getBoundingClientRect()
            const elRect = el.getBoundingClientRect()
            const y = (elRect.top - stackRect.top) + elRect.height * 0.35
            dot.style.top = `${Math.max(12, y)}px`
        }

        const setActive = (el) => {
            cards.forEach((c) => c.classList.toggle('is-active', c === el))
        }

        let activeCard = cards[0]
        let intervalId = null
        let nextIndex = 1
        const cycleDelay = 3400

        const advance = () => {
            activeCard = cards[nextIndex % cards.length]
            nextIndex += 1
            setDotTo(activeCard)
            setActive(activeCard)
        }

        const startLoop = () => {
            if (intervalId) return
            intervalId = setInterval(advance, cycleDelay)
        }

        const stopLoop = () => {
            if (intervalId) {
                clearInterval(intervalId)
                intervalId = null
            }
        }

        setDotTo(activeCard)
        setActive(activeCard)

        if (!prefersReducedMotion.matches) {
            startLoop()
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    stopLoop()
                } else {
                    startLoop()
                }
            })
        }
    })()

    ;(function initReveals() {
        const els = document.querySelectorAll('[data-reveal]')
        if (!els.length) return

        const reduced =
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (reduced) {
            els.forEach((el) => el.classList.add('is-visible'))
            return
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        io.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.18 }
        )

        els.forEach((el) => io.observe(el))
    })()
})

// Copy code helper for demo blocks
window.copyCode = function (button) {
    const codeBlock = button.parentElement?.querySelector('pre')
    const text = codeBlock?.textContent || ''
    if (!text) return
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent
        button.textContent = 'Copied!'
        button.style.background = 'rgba(34, 197, 94, 0.8)'
        setTimeout(() => {
            button.textContent = originalText
            button.style.background = 'rgba(255,255,255,0.1)'
        }, 2000)
    })
}

// Lightweight PostHog listener for data-event elements
;(function () {
    if (typeof window === 'undefined') return
    // data-ph → PostHog bridge: any element with data-ph fires that event.
    document.addEventListener('click', function (e) {
        const el = e.target && e.target.closest && e.target.closest('[data-ph]')
        if (!el) return
        capture(el.getAttribute('data-ph'), {
            href: el.getAttribute('href') || null,
            source: el.getAttribute('data-ph-source') || null,
        })
    })

    const send = (payload) => {
        try {
            if (window.reqresAnalytics && window.reqresAnalytics.ctaClick) {
                window.reqresAnalytics.ctaClick(payload)
            }
        } catch (e) {}
    }
    document.addEventListener('click', function (e) {
        const t =
            e.target &&
            e.target.closest &&
            e.target.closest('[data-event],[data-visitors-event],[data-cta-id]')
        if (!t) return
        const ctaId =
            t.getAttribute('data-cta-id') ||
            t.getAttribute('data-event') ||
            t.getAttribute('data-visitors-event') ||
            'cta'
        const ctaLabel =
            t.getAttribute('data-cta-label') ||
            t.getAttribute('data-visitors-event') ||
            t.getAttribute('aria-label') ||
            (t.textContent || '').trim()
        const location =
            t.getAttribute('data-cta-location') ||
            t.getAttribute('data-visitors-source') ||
            t.getAttribute('data-variant') ||
            'unknown'
        send({
            cta_id: ctaId,
            cta_label: ctaLabel,
            location,
        })
    })
})()

// Billing Toggle Functionality
window.toggleBilling = function toggleBilling() {
    const toggle = document.getElementById('billing-toggle')
    const monthlyPrices = document.querySelectorAll('.monthly-price')
    const annualPrices = document.querySelectorAll('.annual-price')

    console.log('Toggle clicked, checked:', toggle.checked)
    console.log('Monthly prices found:', monthlyPrices.length)
    console.log('Annual prices found:', annualPrices.length)

    if (toggle.checked) {
        // Show annual pricing
        monthlyPrices.forEach((price) => {
            price.style.setProperty('display', 'none', 'important')
        })
        annualPrices.forEach((price) => {
            price.style.setProperty('display', 'inline', 'important')
        })
        console.log('Switched to annual pricing')
    } else {
        // Show monthly pricing
        monthlyPrices.forEach((price) => {
            price.style.setProperty('display', 'inline', 'important')
        })
        annualPrices.forEach((price) => {
            price.style.setProperty('display', 'none', 'important')
        })
        console.log('Switched to monthly pricing')
    }
}

// Mobile menu toggle
function toggleMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle')
    const headerNav = document.querySelector('.header-nav')

    menuToggle.classList.toggle('active')
    headerNav.classList.toggle('active')
}

// Close mobile menu when clicking outside
document.addEventListener('click', function (event) {
    const menuToggle = document.querySelector('.mobile-menu-toggle')
    const headerNav = document.querySelector('.header-nav')

    // Bail out if the menu isn't present on this page
    if (!menuToggle || !headerNav) return

    if (
        !menuToggle.contains(event.target) &&
        !headerNav.contains(event.target)
    ) {
        menuToggle.classList.remove('active')
        headerNav.classList.remove('active')
    }
})

// Copy code functionality
window.copyCode = function (button) {
    const pre = button.parentElement.querySelector('pre code')
    const text = pre.textContent

    navigator.clipboard
        .writeText(text)
        .then(() => {
            const originalText = button.textContent
            button.textContent = 'Copied!'
            button.classList.add('bg-green-600', 'text-white')

            setTimeout(() => {
                button.textContent = originalText
                button.classList.remove('bg-green-600', 'text-white')
            }, 2000)
        })
        .catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = text
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)

            const originalText = button.textContent
            button.textContent = 'Copied!'
            button.classList.add('bg-green-600', 'text-white')

            setTimeout(() => {
                button.textContent = originalText
                button.classList.remove('bg-green-600', 'text-white')
            }, 2000)
        })
}

// Close mobile menu when window is resized to desktop
window.addEventListener('resize', function () {
    if (window.innerWidth > 768) {
        const menuToggle = document.querySelector('.mobile-menu-toggle')
        const headerNav = document.querySelector('.header-nav')

        if (menuToggle) menuToggle.classList.remove('active')
        if (headerNav) headerNav.classList.remove('active')
    }
})

// Company Logo Cloud
;(function initCompanyLogos() {
    const grid = document.getElementById('company-logos-grid')
    if (!grid) return

    // Fisher-Yates shuffle
    function shuffle(array) {
        const arr = array.slice()
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
        }
        return arr
    }

    function renderLogos(logos) {
        const shuffled = shuffle(logos)
        const fragment = document.createDocumentFragment()

        shuffled.forEach(function (company) {
            const anchor = document.createElement('a')

            // Build class list based on properties
            const classes = ['rr-logo']
            if (company.dark) classes.push('rr-logo--dark')
            const weight = company.weight || 'standard'
            if (weight === 'hero') classes.push('rr-logo--hero')
            else if (weight === 'small') classes.push('rr-logo--small')
            anchor.className = classes.join(' ')

            anchor.href = company.link
            anchor.target = '_blank'
            anchor.rel = 'noopener noreferrer'
            anchor.setAttribute(
                'aria-label',
                'ReqRes is used by developers at ' + company.companyName + ' (opens in new tab)'
            )
            anchor.setAttribute('role', 'listitem')

            const img = document.createElement('img')
            img.className = 'rr-logo__img'
            img.src = company.logo
            img.alt = company.companyName
            img.loading = 'lazy'
            img.decoding = 'async'

            // Fallback text for when image fails to load
            const fallback = document.createElement('span')
            fallback.className = 'rr-logo__fallback'
            fallback.textContent = company.companyName

            img.onerror = function () {
                anchor.classList.add('rr-logo--error')
            }

            anchor.appendChild(img)
            anchor.appendChild(fallback)
            fragment.appendChild(anchor)
        })

        grid.appendChild(fragment)

        // Add CTA card in a separate centered container below the grid
        const ctaWrapper = document.createElement('div')
        ctaWrapper.className = 'rr-logo-cta-wrapper'

        const cta = document.createElement('a')
        cta.className = 'rr-logo rr-logo--cta'
        cta.href = 'https://app.reqres.in'
        cta.target = '_blank'
        cta.rel = 'noopener noreferrer'
        cta.setAttribute('aria-label', 'Add your logo here - sign up at app.reqres.in (opens in new tab)')

        const ctaText = document.createElement('span')
        ctaText.className = 'rr-logo__cta-text'
        ctaText.innerHTML = '<span class="rr-logo__cta-plus">+</span> Your logo here'

        cta.appendChild(ctaText)
        ctaWrapper.appendChild(cta)
        grid.parentNode.insertBefore(ctaWrapper, grid.nextSibling)
    }

    fetch('/data/company_logos.json')
        .then(function (res) {
            if (!res.ok) throw new Error('Failed to load logos')
            return res.json()
        })
        .then(renderLogos)
        .catch(function () {
            // Graceful fallback: show a simple message
            grid.innerHTML =
                '<p style="grid-column:1/-1;text-align:center;color:rgba(255,255,255,0.5);font-size:0.875rem;padding:1rem;">Trusted by developers at leading companies worldwide.</p>'
        })

    // Pause dither animation when section is out of view (performance optimization)
    var section = document.getElementById('company-logos')
    var animation = document.getElementById('dither-animation')
    if (section && animation && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        animation.beginElement()
                    } else {
                        animation.endElement()
                    }
                })
            },
            { rootMargin: '50px' }
        )
        observer.observe(section)
    }
})()

// Copy code functionality
window.copyCode = function (button) {
    const pre = button.parentElement.querySelector('pre code')
    const text = pre.textContent

    navigator.clipboard
        .writeText(text)
        .then(() => {
            const originalText = button.textContent
            button.textContent = 'Copied!'
            button.classList.add('bg-green-600', 'text-white')

            setTimeout(() => {
                button.textContent = originalText
                button.classList.remove('bg-green-600', 'text-white')
            }, 2000)
        })
        .catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea')
            textArea.value = text
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)

            const originalText = button.textContent
            button.textContent = 'Copied!'
            button.classList.add('bg-green-600', 'text-white')

            setTimeout(() => {
                button.textContent = originalText
                button.classList.remove('bg-green-600', 'text-white')
            }, 2000)
        })
}
