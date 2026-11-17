import test from 'node:test';
import assert from 'node:assert/strict';
import {
  resolveInitialTab,
  resolveLegalHash,
  readCookiePreferences,
  saveCookiePreferences,
  isNotFoundRoute,
} from './storage';

test('resolveInitialTab defaults to stage on ?src=cv and opens digital on #digital', () => {
  assert.equal(resolveInitialTab('?src=cv', ''), 'stage');
  assert.equal(resolveInitialTab('?src=cv', '#stage'), 'stage');
  assert.equal(resolveInitialTab('?src=cv', '#digital'), 'digital');
  assert.equal(resolveInitialTab('', '#projets'), 'digital');
  assert.equal(resolveInitialTab('', '#services'), 'digital');
});

test('resolveLegalHash maps legal anchor hashes accurately', () => {
  assert.equal(resolveLegalHash('#confidentialite'), 'confidentialite');
  assert.equal(resolveLegalHash('#CGU'), 'cgu');
  assert.equal(resolveLegalHash('#cookies'), 'cookies');
  assert.equal(resolveLegalHash('#mentions'), 'mentions');
  assert.equal(resolveLegalHash('#mentions-legales'), 'mentions');
  assert.equal(resolveLegalHash('#stage'), null);
});

test('isNotFoundRoute detects unknown paths and #404 cleanly', () => {
  assert.equal(isNotFoundRoute('/', ''), false);
  assert.equal(isNotFoundRoute('/index.html', ''), false);
  assert.equal(isNotFoundRoute('/', '#404'), true);
  assert.equal(isNotFoundRoute('/inexistant', ''), true);
});

test('cookie preferences fallback gracefully when window/localStorage is absent', () => {
  assert.equal(readCookiePreferences(), null);
  const saved = saveCookiePreferences(false);
  assert.equal(saved.essential, true);
  assert.equal(saved.analytics, false);
});
